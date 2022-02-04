import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";

const Auth = createNativeStackNavigator();

export function AuthRoutes(){
    return(
        <Auth.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Auth.Screen name="SignIn" component={SignIn}/>
            <Auth.Screen name="SignUp" component={SignUp}/>
        </Auth.Navigator>
    )
}
