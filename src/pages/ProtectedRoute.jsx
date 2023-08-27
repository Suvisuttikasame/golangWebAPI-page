import { useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoute({ children }) {
  const { isAuthen } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthen) navigate("/");
    },
    [isAuthen, navigate]
  );
  return isAuthen ? children : null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
