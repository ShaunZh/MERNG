import { redirect } from "react-router-dom";
import { TOKEN_KEY } from "../hooks/constants"

export function checkAuth() {
    const token = sessionStorage.getItem(TOKEN_KEY)
    if (!token) {
        return redirect('/login')
    }
    return null
}
