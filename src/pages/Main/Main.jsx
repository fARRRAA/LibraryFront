import m from './Main.module.css'
import {store} from '../../imgStore'

export function Main(){
    return (
        <>
            <img className={m.banner} src={store[0].img}>
            </img>
        </>
    )
}