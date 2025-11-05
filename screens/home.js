// screens/home.js

import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { homeStyles } from '../styles/homeStyles';
import { MaterialIcons } from '@expo/vector-icons';
import USER_INFO from '../constants/information';


const HomePage = ({ navigation }) => {
    // Array of app data
    const apps = [
        { id: 1, name: 'Grades' },
        { id: 2, name: 'Exams' },
        { id: 3, name: 'Personal' },
        { id: 4, name: 'Student Card' },
        { id: 5, name: 'Hopon' },
        { id: 6, name: 'Support' },
        { id: 7, name: 'Student Administration' },
    ];

    // Function to get greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning!';
        if (hour < 18) return 'Good Afternoon!';
        return 'Good Evening!';
    };

    // Helper function to get the appropriate icon for each app
    const getIconNameForApp = (appName) => {
        switch (appName) {
            case 'Grades':
                return 'grade';
            case 'Exams':
                return 'assignment';
            case 'Personal':
                return 'person';
            case 'Student Card':
                return 'credit-card';
            case 'Hopon':
                return 'directions-bus';
            case 'Support':
                return 'help';
            case 'Student Administration':
                return 'school';
            default:
                return 'apps';
        }
    };

    return (
        <SafeAreaView style={homeStyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

            {/* Header */}
            <View style={homeStyles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="menu" size={28} color="#333" />
                </TouchableOpacity>

                <View style={homeStyles.logoContainer}>
                    <Text style={homeStyles.logoTextHebrew}>האוניברסיטה העברית בירושלים</Text>
                    <Text style={homeStyles.logoTextEnglish}>THE HEBREW UNIVERSITY OF JERUSALEM</Text>
                    <Text style={homeStyles.logoTextArabic}>الجامعة العبرية في أورشليم القدس</Text>
                </View>

                <TouchableOpacity>
                    <MaterialIcons name="account-circle" size={40} color="#4A374D" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Welcome Section */}
                <View style={homeStyles.welcomeSection}>
                    <Text style={homeStyles.welcomeText}>{getGreeting()} {USER_INFO.firstName}</Text>
                    <TouchableOpacity
                        style={homeStyles.cardIcon}
                        onPress={() => navigation.navigate('StudentCard')}
                    >
                        <MaterialIcons name="credit-card" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* Apps Section */}
                <Text style={homeStyles.sectionTitle}>Important Apps</Text>
                <View style={homeStyles.appGrid}>
                    {apps.map(app => (
                        <TouchableOpacity
                            key={app.id}
                            style={homeStyles.appCard}
                            onPress={() => {
                                if (app.name === 'Student Card') {
                                    navigation.navigate('StudentCard');
                                }
                            }}
                        >
                            <MaterialIcons
                                name={getIconNameForApp(app.name)}
                                size={40}
                                color="#238C85"
                            />
                            <Text style={homeStyles.appName}>{app.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Add extra space for the footer */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Footer */}
            <View style={homeStyles.footer}>
                <TouchableOpacity style={homeStyles.footerLeft}>
                    <MaterialIcons name="email" size={24} color="#FFF" />
                    <Text style={homeStyles.footerText}>Messages</Text>
                </TouchableOpacity>

                <TouchableOpacity style={homeStyles.footerRight}>
                    <MaterialIcons name="home" size={24} color="#4A374D" />
                </TouchableOpacity>
                <View style={{ width: 40 }}>
                    {/* This empty View is fine, no text here */}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomePage;