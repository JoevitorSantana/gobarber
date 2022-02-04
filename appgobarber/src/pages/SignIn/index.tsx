import { Image } from "react-native";
import { Container, Title } from "./styles";
import logoImg from '../../assets/logo.png'

export function SignIn(){
    return(
        <Container>
            <Image source={logoImg}/>

            <Title>Faça seu Logon</Title>
        </Container>
    )
}
