import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import calls from "@/assets/data/calls.json";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { SegmentedControl } from "@/components/SegmentedControl";
import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";

const transition = CurvedTransition.delay(100);

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState(calls);
  const [selectedOption, setSelectedOption] = useState("All");

  const onEdit = () => {
    let editingNew = !isEditing;
    setIsEditing(editingNew);
  };

  useEffect(() => {
    if (selectedOption === "All") {
      setItems(calls);
    } else {
      setItems(calls.filter((call) => call.missed));
    }
  }, [selectedOption]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <SegmentedControl
              options={["All", "Missed"]}
              selectedOption={selectedOption}
              onOptionPress={setSelectedOption}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styles.contentButtonHeader}
              onPress={onEdit}
              activeOpacity={0.7}
            >
              <Text style={styles.textButtonHeader}>
                {isEditing ? "Done" : "Edit"}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View
          layout={transition}
          //layout={LinearTransition.springify().delay(100)}
        >
          <Animated.FlatList
            skipEnteringExitingAnimations
            scrollEnabled={false}
            data={items}
            itemLayoutAnimation={transition}
            //itemLayoutAnimation={LinearTransition.springify().delay(100)}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.contentContainerStyle}
            ItemSeparatorComponent={() => (
              <View style={styles.ItemSeparatorComponent} />
            )}
            renderItem={({ item, index }) => (
              <Animated.View
                entering={FadeInUp.delay(index * 10)}
                exiting={FadeOutUp}
              >
                <View style={styles.containerItem}>
                  <Image source={{ uri: item.img }} style={styles.avatar} />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.name,
                        { color: item.missed ? Colors.red : "#000" },
                      ]}
                    >
                      {item.name}
                    </Text>
                    <View style={styles.wrapperIcon}>
                      <Ionicons
                        name={item.video ? "videocam" : "call"}
                        size={13}
                        color={Colors.gray}
                      />
                      <Text style={styles.incoming}>
                        {item.incoming ? "Incoming" : "Outgoing"}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.wrapperDate}>
                    <Text style={styles.date}>
                      {format(item.date, "MM.dd.yy")}
                    </Text>
                    <Ionicons
                      name="information-circle-outline"
                      size={16}
                      color={Colors.primary}
                    />
                  </View>
                </View>
              </Animated.View>
            )}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  contentButtonHeader: {
    marginLeft: 15,
    flex: 1,
    justifyContent: "center",
  },
  textButtonHeader: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contentContainerStyle: {
    //backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
    height: 950,
  },
  ItemSeparatorComponent: {
    height: 1,
    backgroundColor: Colors.background,
    marginHorizontal: 10,
  },
  containerItem: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  wrapperIcon: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
  },
  incoming: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.gray,
  },
  wrapperDate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  date: {
    color: Colors.gray,
    fontSize: 13,
    fontWeight: "500",
  },
});
