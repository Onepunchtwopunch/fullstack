import React from "react";
import Routes from "./Routes";
import StoreContextProvider from "./contexts/StoreContext";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";
import CommentContextProvider from "./contexts/CommentContext";
import AuthContextProvider from "./contexts/AuthContext";
import axios from "axios";

toast.configure();

const defaultConfirmOptions = {
  title: "Вы уверены?",
  confirmationText: "Да",
  cancellationText: "Отмена",
};

function App() {
  return (
    <ConfirmProvider defaultOptions={defaultConfirmOptions}>
      <StoreContextProvider>
        <CommentContextProvider>
          <AuthContextProvider>
            <Routes />
          </AuthContextProvider>
        </CommentContextProvider>
      </StoreContextProvider>
    </ConfirmProvider>
  );
}

export default App;
