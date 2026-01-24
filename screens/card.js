// screens/card.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
// import prompt from "react-native-prompt-android";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { cardStyles } from "../styles/cardStyles";
import COLORS from "../constants/colors";
import FlipClock from "../components/FlipClock";
import USER_INFO from "../constants/information";

const StudentCard = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [profileImage, setProfileImage] = useState(
    require("../images/mejpg.jpg")
  );

  // State for editable user info
  const [firstName, setFirstName] = useState(USER_INFO.firstName);
  const [lastName, setLastName] = useState(USER_INFO.lastName);
  const [studentId, setStudentId] = useState(USER_INFO.id);

  useEffect(() => {
    // Load saved user data when component mounts
    loadUserData();
    updateTimeAndDate();
    const interval = setInterval(updateTimeAndDate, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load user data from AsyncStorage
  const loadUserData = async () => {
    try {
      const savedFirstName = await AsyncStorage.getItem("firstName");
      const savedLastName = await AsyncStorage.getItem("lastName");
      const savedStudentId = await AsyncStorage.getItem("studentId");
      const savedProfileImage = await AsyncStorage.getItem("profileImage");

      if (savedFirstName) setFirstName(savedFirstName);
      if (savedLastName) setLastName(savedLastName);
      if (savedStudentId) setStudentId(savedStudentId);
      if (savedProfileImage) setProfileImage({ uri: savedProfileImage });
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  // Save user data to AsyncStorage
  const saveUserData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const updateTimeAndDate = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const date = now
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");

    setCurrentTime(time);
    setCurrentDate(date);
  };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Sorry, we need camera roll permissions to change your photo!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setProfileImage({ uri: imageUri });
        // Save the image URI
        await saveUserData("profileImage", imageUri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Something went wrong while selecting the image.");
    }
  };

  const editName = () => {
    const currentFullName = `${firstName} ${lastName}`;

    if (Platform.OS === "ios") {
      Alert.prompt(
        "Edit Name",
        "Enter your full name:",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Save",
            onPress: async (text) => {
              if (text && text.trim()) {
                const names = text.trim().split(" ");
                const newFirstName = names[0] || "";
                const newLastName = names.slice(1).join(" ") || "";

                setFirstName(newFirstName);
                setLastName(newLastName);

                // Save to AsyncStorage
                await saveUserData("firstName", newFirstName);
                await saveUserData("lastName", newLastName);
              }
            },
          },
        ],
        "plain-text",
        currentFullName
      );
    } else {
      prompt(
        "Edit Name",
        "Enter your full name:",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Save",
            onPress: async (text) => {
              if (text && text.trim()) {
                const names = text.trim().split(" ");
                const newFirstName = names[0] || "";
                const newLastName = names.slice(1).join(" ") || "";

                setFirstName(newFirstName);
                setLastName(newLastName);

                // Save to AsyncStorage
                await saveUserData("firstName", newFirstName);
                await saveUserData("lastName", newLastName);
              }
            },
          },
        ],
        {
          type: "plain-text",
          cancelable: true,
          defaultValue: currentFullName,
        }
      );
    }
  };

  const editStudentId = () => {
    if (Platform.OS === "ios") {
      Alert.prompt(
        "Edit Student ID",
        "Enter your student ID:",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Save",
            onPress: async (text) => {
              if (text && text.trim()) {
                const newStudentId = text.trim();
                setStudentId(newStudentId);
                // Save to AsyncStorage
                await saveUserData("studentId", newStudentId);
              }
            },
          },
        ],
        "plain-text",
        studentId
      );
    } else {
      prompt(
        "Edit Student ID",
        "Enter your student ID:",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Save",
            onPress: async (text) => {
              if (text && text.trim()) {
                const newStudentId = text.trim();
                setStudentId(newStudentId);
                // Save to AsyncStorage
                await saveUserData("studentId", newStudentId);
              }
            },
          },
        ],
        {
          type: "plain-text",
          cancelable: true,
          defaultValue: studentId,
        }
      );
    }
  };

  // Rest of your component remains the same...
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={cardStyles.outerContainer}>
        <SafeAreaView style={cardStyles.safeArea}>
          {/* Purple Header Section */}
          <View style={cardStyles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={cardStyles.headerTextArrow}>←</Text>
            </TouchableOpacity>
            <Text style={cardStyles.headerTitle}>Student Card</Text>
            <Text style={cardStyles.headerText}>He</Text>
          </View>

          <View style={cardStyles.contentContainer}>
            {/* Card */}
            <View style={cardStyles.card}>
              {/* Cyan Top Section */}
              <View style={cardStyles.cardHeader}>
                <View style={cardStyles.logoContainer}>
                  <Image
                    source={require("../images/Hebrew_University_Logo.svg.png")}
                    style={cardStyles.logoImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={cardStyles.headerTextContainer}>
                  <Text style={cardStyles.cardHeaderTextHebrew}>
                    האוניברסיטה העברית בירושלים
                  </Text>
                  <Text style={cardStyles.cardHeaderTextEnglish}>
                    THE HEBREW UNIVERSITY OF JERUSALEM
                  </Text>
                </View>
              </View>

              {/* Purple Middle Section */}
              <View style={cardStyles.cardBody}>
                <View style={cardStyles.infoContainer}>
                  <View style={cardStyles.infoSection}>
                    <Text style={cardStyles.infoLabel}>Student Name</Text>
                    <TouchableOpacity onPress={editName} activeOpacity={0.7}>
                      <Text style={cardStyles.infoValue}>
                        {firstName + " " + lastName}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={cardStyles.infoSection}>
                    <Text style={cardStyles.infoLabel}>
                      Academic Institution
                    </Text>
                    <Text style={cardStyles.infoValue}>
                      The Hebrew University{"\n"}of Jerusalem
                    </Text>
                  </View>

                  <View style={cardStyles.infoSection}>
                    <Text style={cardStyles.infoLabel}>ID</Text>
                    <TouchableOpacity
                      onPress={editStudentId}
                      activeOpacity={0.7}>
                      <Text style={cardStyles.infoValue}>{studentId}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Right Side - Photo and Year */}
                <View style={cardStyles.photoContainer}>
                  <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
                    <Image style={cardStyles.photo} source={profileImage} />
                  </TouchableOpacity>
                  <View style={cardStyles.yearBox}>
                    <Text style={cardStyles.yearText}>תש"ו</Text>
                    <Text style={cardStyles.yearText}>2025-2026</Text>
                  </View>
                </View>
              </View>

              {/* White Bottom Section */}
              <View style={cardStyles.cardFooter}>
                <View style={cardStyles.barcodeContainer}>
                  <TouchableOpacity style={cardStyles.arrowButton}>
                    <Text style={cardStyles.arrowText}>‹</Text>
                  </TouchableOpacity>

                  <View style={cardStyles.barcodeContent}>
                    <Image
                      style={cardStyles.barcode}
                      source={require("../images/wide_barcode.png")}
                    />
                    <Text style={cardStyles.barcodeNumber}>{studentId}</Text>
                  </View>

                  <TouchableOpacity style={cardStyles.arrowButton}>
                    <Text style={cardStyles.arrowText}>›</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Add the time and date display */}
            <View style={cardStyles.timeContainer}>
              <Text style={cardStyles.timeText}>{currentTime}</Text>
              <Text style={cardStyles.dateText}>{currentDate}</Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default StudentCard;
