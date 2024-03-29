import axios from "axios";
import {useContext, createContext, useState, ReactNode, useEffect} from "react"
import {Navigate} from "react-router-dom"
import { Loading } from "./components/Loading";

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
  password: number | string,
}
// interface ProfileData {
//   name?: string, 
//   email?: string
// }
interface authProps {
  user: User | null;
  register: (registerData: RegisterData) => Promise<void>
  signIn: (loginData: LoginData) => Promise<void>;
  signOut: () => Promise<void>;
  // saveProfile: (formData: FormData | ProfileData) => Promise<void>;
  task: any;
  loading: boolean;
}
interface Props {
  children: ReactNode
}
interface RouteProps {
  component: any,
  redirect: string,
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

  const register = async (registerData: RegisterData) => {
    try {
      const res = await axios.post('/api/register', registerData)
      setUser(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const [loading, setLoading] = useState(true);
  const signIn = async (loginData: LoginData) => { // asyncは関数の前につけるだけで非同期処理を行うことができる、promiseを返してくれる
    try { //　tryは例外処理
          const res = await axios.post('/api/login', loginData) // ログイン, awaitはpromise処理の結果が返ってくるまで一時停止してくれる演算子
          setUser(res.data)
    } catch (error) {
      throw error;
    }

    // return axios.get('/api/user').then((res) => {
    //   setUser(res.data)
    // }).catch(() => {
    //   setUser(null)
    // })
  }

  const signOut = () => {
    return axios.post('/api/logout', {}).then(() => { // ログアウト
      setUser(null)
    }).catch((error) => {
      throw error;
    })
  }

  // const saveProfile = async (formData: FormData | ProfileData) => { // ユーザー情報更新
  //   const res = await axios.post(
  //     '/api/user/profile-information', 
  //     formData, 
  //     {headers: {'X-HTTP-Method-Override': 'PUT'}}
  //   )
  //   .catch((error) => {
  //     throw error;
  //   })
  //   if(res?.status == 200) {
  //     return axios.get('/api/user').then((res) => {
  //       setUser(res.data)
  //     }).catch(() => {
  //       setUser(null)
  //     })
  //   }
  // }

  // タスク登録処理
  const task = async(taskData) => {
    try{
      await axios.post('/api/task', taskData);
    } catch(error) {
      console.log(error);
    }
  }

  // 初回アクセス時ユーザー情報取得,useEffect(実行する関数, [依存する値]);
  useEffect(() => {
    axios.get('/api/user').then((res) => {
      setUser(res.data)
      console.log(res.data)
      setLoading(false);
    }).catch((error) => {
      setUser(null)
      setLoading(false);
      console.log(error)
    })
  }, [])

  return {
    user,
    register,
    signIn,
    signOut,
    // saveProfile,
    task,
    loading,
  }
} // ここまでuseProvideAuth

/**
 * 認証済みのみアクセス可能
 * 
 */
export const PrivateRoute = (props: RouteProps) => {
  const auth = useAuth();
  const {redirect, component} = props;

  if (auth?.loading) { // 認証待機中の場合はローディング画面を表示
    return <Loading />;
  } else if (auth?.user === null) { // 認証されていない場合はリダイレクト
    return <Navigate to={redirect} />;
  } else {
    return <>{component}</>; // 認証されている場合はコンポーネントを表示
  }
}

/**
 * 認証していない場合のみアクセス可能（ログイン画面など）
 */
// export const PublicRoute = (props) => {
//   const auth = useAuth();

//   const {component, redirect} = props;
//   const location = useLocation();
//   if (auth?.user == null) {
//     return <>{component}</>;
//   } else {
//     console.log(location.pathname)
//     const dynamicRedirect = determineRedirect(location.pathname);
//     return <Navigate to={dynamicRedirect} />;
//   }
// };
// const determineRedirect = (pathname) => {
//   // URLパスに応じて、リダイレクト先を決定するロジックを実装する
//   if (pathname === '/') {
//     return '/home';
//   } else if (pathname === '/home') {
//     return '/home';
//   } else if (pathname === '/addition') {
//     return '/addition';
//   } else if (pathname === '/account') {
//     return '/account';
//   }
// }
export const PublicRoute = (props: RouteProps) => {
  const auth = useAuth();
  const {redirect, component} = props;

  if (auth?.user === null) {
    return <>{component}</>
  } else {
    return <Navigate to={redirect}/>
  }
}