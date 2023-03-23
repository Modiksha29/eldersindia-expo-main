import React from "react";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { Layout, Button, Icon, Text, useTheme } from "@ui-kitten/components";
import Logo from "assets/images/Logo";
import {LinearGradient} from 'expo-linear-gradient';
import { useMMKVObject } from "react-native-mmkv";
import { storage } from "provider/storageProvider";


export default function Page() {
  const theme = useTheme();
  const { replace, } = useRouter();
  const [data, setData] = useMMKVObject('data', storage);
  // const infiniteAnimationIconRef = React.useRef();

  // const renderInfiniteAnimationIcon = (props) => (
  //   <Icon
  //     {...props}
  //     ref={infiniteAnimationIconRef}
  //     animationConfig={{ cycles: Infinity }}
  //     animation="pulse"
  //     name="arrowhead-right-outline"
  //   />
  // );

  // React.useEffect(() => {
  //   infiniteAnimationIconRef.current.startAnimation();
  // }, []);

  return (
    <LinearGradient
      colors={[
        theme["color-basic-100"],
        theme["color-basic-100"],
        theme["color-primary-100"],
      ]}
      style={{ flex: 1 }}
    >
      <Layout
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 100,
          backgroundColor: "transparent",
        }}
      >
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing" }}
          style={{ paddingVertical: 8 }}
        >
          <Logo width="250" height="107.13" />
        </MotiView>
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing" }}
          style={{ paddingVertical: 8 }}
        >
          <Button
            // accessoryRight={renderInfiniteAnimationIcon}
            size="large"
            onPress={() => replace("/sign-in")}
          >
            <Text
              style={{ paddingRight: "100 !important" }}
              // onPress={() => setData(null)}
            >{`Let's Beign`}</Text>
          </Button>
        </MotiView>
      </Layout>
    </LinearGradient>
  );
}
