import { AppRegistry, Dimensions } from "react-native";

import App from "./App";
import $ from 'jquery';
AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});

/* These are gonna be delete in product */
$('#root > div').css({
    height: `${ Dimensions.get('screen').height }px`,
    display: "block"
})

$('#root > div > div').css({
    height: `${ Dimensions.get('screen').height }px`,
    display: "block"
})
