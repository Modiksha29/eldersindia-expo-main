import 'react-native-url-polyfill/auto';
import Toast from 'react-native-toast-message';
// import { SafeAreaView } from "react-native-safe-area-context";
import { SheetProvider } from "react-native-actions-sheet";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Eva from "./theming/eva";
import QueryProvider from "./query-provider";
import AuthProvider from './auth-provider'
import "./sheets"

export function Provider({ children }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <Eva>
          <ActionSheetProvider>
            <SheetProvider>
              {children}
            </SheetProvider>
          </ActionSheetProvider>
        </Eva>
        <Toast />
      </AuthProvider>
    </QueryProvider>
  );
}
