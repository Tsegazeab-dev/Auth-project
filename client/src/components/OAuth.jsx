import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app)

    const handleGoogleAuth = async ()=>{
        const provider = new GoogleAuthProvider();
try{
    const res = await signInWithPopup(auth, provider);
        console.log(res)
        const result = await fetch('/api/auth/google', {
            method: 'post',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                name: res.user.displayName,
                email: res.user.email,
                picture: res.user.photoURL
            })

        });

        const data = await result.json();
        dispatch(signInSuccess(data));
        navigate('/')
}
catch(err){
    dispatch(signInFailure(err))
}

    }
  return (
    <div>
        <button type="button" 
        onClick={handleGoogleAuth}
        className="bg-slate-100 w-full flex gap-3 items-center justify-center p-2 rounded-lg"><img src="https://banner2.cleanpng.com/20190731/uqk/kisspng-google-icon-5d4175d6037a16.4552672815645710940143.jpg" alt="" className="w-10" /> Google</button>
    </div>
  )
}
