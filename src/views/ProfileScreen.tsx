import { View , Text} from "react-native";
import Avatar from "../components/Avatar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthsContext";

export default function ProfileScreen({ navigation }: any) {
    const{currentUser} = useContext(AuthContext)
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Avatar user={currentUser} size={90}/>
            <Text>{currentUser.username}</Text>
            
        </View>
    )
}