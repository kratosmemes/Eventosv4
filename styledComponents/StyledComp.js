import styled from 'styled-components/native';


export const ButtonContainer = styled.View`
    width: 60%;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
`;

export const InputContainer = styled.View`
    width: 80%;
    margin-top: 40px;
`;

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    /* align-items: center; */
    justify-content: center;
`;

export const Button = styled.TouchableOpacity`
    background-color: #0782F9;
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    align-items: center;
`;

export const ButtonOutline = styled.TouchableOpacity`
    background-Color: #0782F9;
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    align-items: center;
    background-color: white;
    margin-top: 5px;
    border-color: #0782F9;
    border-width: 2px;
`;

export const ButtonText = styled.Text`
    color: white;
    font-weight: 700px;
    font-size: 16px;
`;

export const OnlyText = styled.Text`
    color: black;
    font-weight: 700px;
    font-size: 16px;
`;

export const ButtonOutlineText = styled.Text`
    color: #0782F9;
    font-weight: 700px;
    font-size: 16px;
`;

export const Input = styled.TextInput`
    background-color: white;
    padding-top: 15px;
    padding-inline-start: 15px;
    border-radius: 10px;
    margin-top: 5px;
`;