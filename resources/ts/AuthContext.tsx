import axios from "axios";
import {useContext, createContext, useState, ReactNode, useEffect} from "react"
import {Route, Navigate,useLocation} from "react-router-dom"

// SPA認証とアクセス制限
interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  two_factor_recovery_codes: string | null
  two_factor_secret: string | null
  created_at: string
  updated_at: string | null
}
interface LoginData {
  email: string,
  password: string,
}
export interface RegisterData {
  email: string,
  password: string,
}
interface ProfileData {
  name?: string, // ?がついてるプロパティは使っても使わなくても良いと言う意味
  email?: string
}
interface authProps {
  user: User | null;
  register: (registerData: RegisterData) => Promise<void>
  signIn: (loginData: LoginData) => Promise<void>;
  signOut: () => Promise<void>;
  saveProfile: (formData: FormData | ProfileData) => Promise<void>;
}
interface Props {
  children: ReactNode
}
interface RouteProps {
  component: any,
  redirect: string,
}
interface From {
  from: Location
}

export const AuthContext = createContext<authProps | null>(null) // 渡す値の型はauthPropsまたはnullで初期値はnull

export const ProvideAuth = ({children}: Props) => { // childrenにしないとindex.jsxで使えない。propsだと不可、引数の段階で分割代入している
  const auth = useProvideAuth(); // authは認証ユーザーのデータを持ってる、下で定義している
  return (
    <AuthContext.Provider value={auth}> 
      {children}
    </AuthContext.Provider> // childrenにはコンポーネントが入り、それらすべてがauthという値を使うことができる
  )
}

export const useAuth = () => {
  return useContext(AuthContext) // authの値を参照できる、この関数を実行することで認証ユーザーのデータを参照することができる
}

const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null); 

  const register = (registerData: RegisterData) => {
    return axios.post('/api/register', registerData).then((res) => { // 登録、postはサーバーへ情報を送る、第2引数に実際に送信する値
      axios.get('api/user').then((res) => { // getはAPI通信でサーバーからデータ取得、thenが成功した時の処理、resが取得したデータ
        setUser(res.data) // userにデータが入る
      })
    })
  }

  const signIn = async (loginData: LoginData) => { // asyncは関数の前につけるだけで非同期処理を行うことができる、promiseを返してくれる
    try { //　tryは例外処理
          await axios.post('/api/login', loginData); // ログイン, awaitはpromise処理の結果が返ってくるまで一時停止してくれる演算子
    } catch (error) {
      throw error;
    }

    return axios.get('/api/user').then((res) => {
      setUser(res.data)
    }).catch(() => {
      setUser(null)
    })
  }

  const signOut = () => {
    return axios.post('/api/logout', {}).then(() => { // ログアウト
      setUser(null)
    }).catch((error) => {
      throw error;
    })
  }

  const saveProfile = async (formData: FormData | ProfileData) => { // ユーザー情報更新
    const res = await axios.post(
      '/api/user/profile-information', 
      formData, 
      {headers: {'X-HTTP-Method-Override': 'PUT'}}
    )
    .catch((error) => {
      throw error;
    })
    if(res?.status == 200) {
      return axios.get('/api/user').then((res) => {
        setUser(res.data)
      }).catch(() => {
        setUser(null)
      })
    }
  }

  // 初回アクセス時ユーザー情報取得,useEffect(実行する関数, [依存する値]);
  useEffect(() => {
    axios.get('/api/user').then((res) => {
      setUser(res.data)
    }).catch(() => {
      setUser(null)
    })
  }, [])

  return {
    user,
    register,
    signIn,
    signOut,
    saveProfile
  }
} // ここまでuseProvideAuth

/**
 * 認証済みのみアクセス可能
 * 
 */
export const PrivateRoute = (props: RouteProps) => {
  const auth = useAuth()

  const {redirect, component} = props;

  if (auth?.user === null) {
    return <Navigate to={redirect} state={{from:useLocation()}} />
  } else {
    return <>{component}</>
  }
  
}


/**
 * 認証していない場合のみアクセス可能（ログイン画面など）
 */
export const PublicRoute = ({children, path}: RouteProps) => {
  const auth = useAuth()
  return (
    <Route
      path={path}
      render={({ location }:any) => { // あとで修正
        if(auth?.user === null) {
          return children
        } else {
          return <Navigate to={{pathname: (location.state as From) ? (location.state as From).from.pathname : '/' , state: { from: location }}}/>
        }
      }}
    />
  )
}

/* <Navigate to="/" state={{ from: location }}/> */
// {{pathname: (navigate.location.state as From) ? (navigate.location.state as From).from.pathname : '/' , state: { from: location }}}