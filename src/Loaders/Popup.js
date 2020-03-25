// @flow
import BasicLoader from "./BasicLoader";

/**
 * Popup Loader
 */
export default class Popup extends BasicLoader {
  /**
   * Execute Popup Loader
   */
  execute() {
    /*
     * In the popup's scripts, running on <http://example.org>:
     */
    return new Promise<void>((resolve) => {
      // window.addEventListener("jso_message", function(event) {
      // 	console.log("Sent a message to event.origin " + event.origin + " and got the following in response:")
      // 	console.log("<em>", event.data, "</em>")
      // 	var url = newwindow.location.href
      // 	// console.error("Popup location is ", url, newwindow.location)
      //   resolve(url)
      // })

      window.popupCompleted = function() {
        const url = newwindow.location.href;
        resolve(url);
      };

      const newwindow = window.open(
        this.url,
        "jso-popup-auth",
        "height=600,width=800"
	  );

      if (newwindow === null) {
        throw new Error("Error loading popup window");
      }
      if (window.focus) {
        newwindow.focus();
      }
    });
  }
}
