import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setUserInfo,
  setLoading,
  setError,
  selectUserInfo,
} from "../redux/auth/firebaseAuthSlice.ts";
import { auth, googleProvider } from "../firebase/firebaseConfig.ts";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FormEvent, useState } from "react";

const Firebase = () => {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      dispatch(setUserInfo(authUser.providerData[0]));
    } else {
      if (userInfo !== null) {
        dispatch(setUserInfo(null));
      }
    }
  });

  const [signInInput, setSignInInput] = useState({
    email: "",
    password: "",
  });

  const signInhandleChange = ({ target: { name, value } }: any) => {
    setSignInInput({ ...signInInput, [name]: value });
  };

  const [signUpInput, setSignUpInput] = useState({
    email: "",
    password: "",
  });

  const signUphandleChange = ({ target: { name, value } }: any) => {
    setSignUpInput({ ...signUpInput, [name]: value });
  };

  const signInHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, signInInput.email, signInInput.password)
      .then((result) => {
        const { user } = result;
        console.log("User:", user.providerData[0]);
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
        console.log(error.message);
      });
  };

  const signUpHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      signInInput.email,
      signInInput.password
    )
      .then((result) => {
        const { user } = result;
        console.log("User:", user.providerData[0]);
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
        console.log(error.message);
      });
  };

  const handleGoogleLogin = () => {
    dispatch(setLoading(true));
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { user } = result;
        console.log("User:", user.providerData[0]);
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
        console.log(error.message);
      });
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div>
      <h1>React Redux Firebase TypeScript</h1>
      <br />
      {userInfo ? (
        <div>
          <h2>
            Welcome,{" "}
            {userInfo?.displayName ? userInfo.displayName : userInfo.email}
          </h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <form onSubmit={(e) => signInHandleSubmit(e)}>
            <label>Login</label>
            <input name="email" type="email" onChange={signInhandleChange} />
            <input
              name="password"
              type="password"
              onChange={signInhandleChange}
            />
            <button>Sign In</button>
          </form>
          <br />
          <form onSubmit={(e) => signUpHandleSubmit(e)}>
            <label>Register</label>
            <input name="email" type="email" onChange={signUphandleChange} />
            <input
              name="password"
              type="password"
              onChange={signUphandleChange}
            />
            <button>Sign Up</button>
          </form>
          <br />
          <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
      )}
    </div>
  );
};

export default Firebase;
