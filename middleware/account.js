export default function({ route, redirect }){
  if (route.path == "/account" || route.path == "/account/"){
    return redirect('/')
  }
}