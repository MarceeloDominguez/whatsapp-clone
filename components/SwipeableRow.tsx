import React, { useRef } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

interface SwipeableRowProps {
  onDelete: () => void;
  children: React.ReactNode;
}

const SwipeableRow: React.FC<SwipeableRowProps> = ({ onDelete, children }) => {
  const swipeableRow = useRef<Swipeable>(null);

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => (
    <View style={{ width: 300, flexDirection: "row" }}>
      {renderRightAction("Delete", "#dd2c00", 300, progress)}
    </View>
  );

  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const pressHandler = () => {
      close();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const close = () => {
    swipeableRow.current?.close();
    onDelete();
  };

  const onSwipeableOpen = () => {
    close();
  };

  return (
    <Swipeable
      ref={swipeableRow}
      enableTrackpadTwoFingerGesture
      friction={1.4}
      overshootRight={false}
      rightThreshold={140}
      renderRightActions={renderRightActions}
      onSwipeableOpen={onSwipeableOpen}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
    alignSelf: "flex-start",
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default SwipeableRow;
