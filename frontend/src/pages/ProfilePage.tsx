import styled from "styled-components";
import {useGetUserById} from "../hooks/useUsers";
import {useEffect} from "react";
import {useAuth} from "../auth/AuthContext";

export const ProfilePage = () => {
    const badges = ["🏆", "🎖️", "🎯"];
    const emojis = ["😳", "😜", "🤯", "🤤", "😩", "💀"];
    const {mutate: getUserByID, isPending, data, error} = useGetUserById()
    const {decodedToken} = useAuth()

    useEffect(() => {
        getUserByID({param: decodedToken.userID.toString()})
    }, [decodedToken, getUserByID]);

    if (isPending) return <h1>Loading...</h1>;
    if (error) return <h1>Error loading user data!</h1>;
    if (!data) return <h1>No user data found.</h1>;
    return (
        <ProfileContainer>
            <ProfileHeader>
                <ProfilePicture />
                <Nickname>{data.username}</Nickname>
            </ProfileHeader>

            <Actions>
                <ActionButton>Message</ActionButton>
                <ActionButton>Invite to Friends</ActionButton>
                <ActionButton>Trade</ActionButton>
                <ActionButton>Invite to Play</ActionButton>
            </Actions>

            <Section>
                <SectionTitle>Badges</SectionTitle>
                <IconsContainer>
                    {badges.map((badge, index) => (
                        <Icon key={index}>{badge}</Icon>
                    ))}
                </IconsContainer>
            </Section>

            <Section>
                <SectionTitle>Unlocked emojis</SectionTitle>
                <IconsContainer>
                    {emojis.map((emoji, index) => (
                        <Icon key={index}>{emoji}</Icon>
                    ))}
                </IconsContainer>
            </Section>
        </ProfileContainer>
    );
};


const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    overflow: hidden;
    align-items: center;
    justify-content: flex-start;
`;


const ProfileHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
`;


const ProfilePicture = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #323232;
    border: 3px solid #F5F5F5;
    margin-bottom: 1rem;
`;


const Nickname = styled.h2`
    font-size: 1.5rem;
    color: #000000;
    text-align: center;
`;


const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    width: 100%;
    margin-bottom: 2.5rem;
`;


const ActionButton = styled.button`
    background-color: #780CC7;
    color: #F5F5F5;
    border: none;
    padding: 1rem;
    border-radius: 15px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #200334;
    }
`;


const Section = styled.div`
    width: 100%;
    padding: 1rem;
    background-color: #323232;
    border-radius: 15px;
    box-sizing: border-box;
    margin-bottom: 2rem;
`;


const SectionTitle = styled.h3`
    font-size: 1.4rem;
    color: #F5F5F5;
    margin-bottom: 1.3rem;
    text-align: center;
`;


const IconsContainer = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
`;


const Icon = styled.div`
    font-size: 1.5rem;
    background-color: #484848;
    border-radius: 50%;
    padding: 1rem;
    color: #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
`;