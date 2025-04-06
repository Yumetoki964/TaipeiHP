# 認証システムアーキテクチャ設計

## 概要
夢時商業股份有限公司のウェブサイトにおける認証システムの設計について記述します。本ウェブサイトでは、主に2つの目的で認証システムを使用します：
1. コンテンツ管理システム（CMS）へのアクセス制御
2. お問い合わせおよび体験授業申し込みフォームのスパム防止

## 認証サービス選定

### Firebase Authentication
本プロジェクトでは、Firebase Authenticationを認証サービスとして採用します。

**選定理由**:
- 容易な実装と統合
- 多様な認証方法（メール/パスワード、SNS連携など）
- セキュリティの高さ（Google提供のセキュリティ基盤）
- Firebase Hostingとの優れた互換性
- 無料枠が十分な範囲で利用可能
- 日本語ドキュメントが充実

## ユーザー階層と権限設計

### ユーザー種別
1. **管理者（Admin）**
   - 権限: すべての機能にアクセス可能
   - 役割: コンテンツ管理、ユーザー管理、お問い合わせ対応など

2. **編集者（Editor）**
   - 権限: コンテンツの作成・編集・削除
   - 役割: ブログ記事やニュースの更新、校舎情報の更新など

3. **閲覧者（Viewer）**
   - 権限: 管理画面の閲覧のみ
   - 役割: お問い合わせ内容の確認、統計データの閲覧など

### 権限マトリックス

| 機能/リソース | 管理者 | 編集者 | 閲覧者 | 一般ユーザー |
|-------------|-------|-------|-------|------------|
| コンテンツ作成 | ✅    | ✅    | ❌    | ❌         |
| コンテンツ編集 | ✅    | ✅    | ❌    | ❌         |
| コンテンツ削除 | ✅    | ✅    | ❌    | ❌         |
| ユーザー管理  | ✅    | ❌    | ❌    | ❌         |
| 問い合わせ閲覧 | ✅    | ✅    | ✅    | ❌         |
| 問い合わせ返信 | ✅    | ✅    | ❌    | ❌         |
| 統計データ閲覧 | ✅    | ✅    | ✅    | ❌         |
| 設定変更     | ✅    | ❌    | ❌    | ❌         |

## 認証フロー

### 管理画面ログインフロー
1. ユーザーが管理画面URLにアクセス
2. 未認証の場合、ログイン画面にリダイレクト
3. メールアドレスとパスワードでログイン
4. Firebase Authenticationでの認証
5. 認証成功後、JWTトークンをセッションストレージに保存
6. ユーザーの権限に応じた管理画面を表示

### ログアウトフロー
1. ユーザーがログアウトボタンをクリック
2. セッションストレージからトークンを削除
3. Firebase Authenticationでのログアウト処理
4. ログイン画面へリダイレクト

## 保護ルートパターン

### React Router保護ルート実装
フロントエンドでは、React Routerを使用して保護ルートを実装します。

```jsx
// ProtectedRoute.jsx
const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, userRole, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }
  
  if (requiredRole && userRole !== requiredRole && userRole !== 'admin') {
    return <Navigate to="/admin/unauthorized" replace />;
  }
  
  return children;
};

// 使用例
<Route 
  path="/admin/users" 
  element={
    <ProtectedRoute requiredRole="admin">
      <UserManagement />
    </ProtectedRoute>
  } 
/>
```

## 認証状態管理

### Contextを使用した中央管理
Reactの Context APIを使用して、アプリケーション全体で認証状態を管理します。

```jsx
// AuthContext.jsx
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // Firebaseからユーザー情報を取得
        const token = await user.getIdTokenResult();
        const role = token.claims.role || 'viewer';
        
        setCurrentUser(user);
        setUserRole(role);
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);
  
  const value = {
    currentUser,
    userRole,
    loading,
    login: (email, password) => firebase.auth().signInWithEmailAndPassword(email, password),
    logout: () => firebase.auth().signOut()
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

## 認証状態の永続化

本プロジェクトでは、以下の永続化方式を採用します：

1. **セッションストレージ**
   - ブラウザセッション中のみトークンを保持
   - ブラウザ/タブを閉じるとログアウト
   - セキュリティとユーザビリティのバランスが良い

```javascript
// firebase.js
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
```

## セキュリティ対策

1. **CSRF対策**
   - Firebase Authenticationの組み込み保護機能を活用
   - すべてのAPI要求にJWTトークンを含める

2. **XSS対策**
   - ReactのDOMサニタイゼーション機能の活用
   - Content Security Policy (CSP)の実装

3. **レート制限**
   - ログイン試行回数の制限
   - Cloud Firestore Security Rulesによるアクセス制限

4. **監査ログ**
   - すべての認証イベントをログに記録
   - 定期的なセキュリティレビュー

## 今後の拡張計画

1. **多要素認証の導入**
   - より高いセキュリティが必要な場合に備えた設計

2. **SSO (シングルサインオン)連携**
   - 将来的に他のサービスと統合する場合の拡張性

3. **自動アカウントロック**
   - 不審な活動を検出した場合のアカウント保護機能