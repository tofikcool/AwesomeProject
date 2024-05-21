import { Toast } from "native-base";
import { View, Dimensions, Text } from "react-native";
import { FontName } from "../res/styles/FontName";
import ResponsivePixels from "../res/styles/ResponsivePixels";
import { Colors } from "../res/styles/Colors";

let toastRef: any = undefined;
type TOAST_TYPES = "success" | "danger" | "warning" | "info";

export const showToast = (
    message: string,
    duration = 4000,
    type = "success"
  ) => {
    // const styledata = isIos() ? { top: 15 } : { position: "absolute", bottom: 0 };
    const styledata = { top: 15 };
    let bgColor = Colors.defaultGreenColor;
    if (type === "warning") {
      bgColor = Colors.StatusYellowColor;
    } else if (type === "danger") {
      bgColor = Colors.defaultRedColor;
    }
    if (!toastRef) {
      Toast.show({
        title: message.toString(),
        duration,
        // placement: isIos() ? "top" : "bottom",
        placement: "bottom",
        style: styledata,
        render: () => {
          toastRef = "Some dummy value";
          return (
            <View
              style={{
                backgroundColor: bgColor,
                width: Dimensions.get("window").width,
                marginHorizontal: ResponsivePixels.size24,
              }}
            >
              <Text
                style={{
                  fontFamily: FontName.regular,
                  paddingVertical: ResponsivePixels.size15,
                  paddingHorizontal: ResponsivePixels.size10,
                  color: Colors.Defaultwhite,
                }}
              >
                { message}
              </Text>
            </View>
          );
        },
        onCloseComplete: () => {
          toastRef = undefined;
        },
      });
    }
  };