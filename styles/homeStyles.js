// styles/homeStyles.js

import { StyleSheet, Platform, Dimensions } from 'react-native';
import COLORS from '../constants/colors';

const { width } = Dimensions.get('window');

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    placeholderIcon: {
        width: 30,
        height: 25,
        backgroundColor: '#DDD',
        borderRadius: 4,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoTextHebrew: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 2,
    },
    logoTextEnglish: {
        fontSize: 11,
        color: '#333',
        textAlign: 'center',
        marginBottom: 2,
    },
    logoTextArabic: {
        fontSize: 11,
        color: '#333',
        textAlign: 'center',
    },
    placeholderLogo: {
        width: 150,
        height: 40,
        backgroundColor: '#DDD',
        borderRadius: 6,
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#4A374D',
    },
    welcomeSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    cardIcon: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderSmallIcon: {
        width: 24,
        height: 24,
        backgroundColor: '#DDD',
        borderRadius: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    appGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    appCard: {
        width: (width - 60) / 3,
        backgroundColor: '#FFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        marginBottom: 15,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    appIcon: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },
    appName: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    logoText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    footer: {
        backgroundColor: '#4A374D',
        height: 80,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    footerLeft: {
        alignItems: 'center',
    },
    footerRight: {
        alignItems: 'center',
    },
    footerText: {
        color: '#FFF',
        marginTop: 5,
        fontSize: 12,
    }
});