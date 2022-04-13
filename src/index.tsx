import { Clipboard, closeMainWindow, showHUD } from "@raycast/api";
import request from "request";

export default async function main() {
  const URL = (await Clipboard.readText()) || "";
  const reg = RegExp("(?<=<title.*>).*(?=</title>)");

  request(URL, async (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const title = reg.exec(body);
      if (!title) {
        await showHUD("No title");
        await closeMainWindow({ clearRootSearch: true });
      } else {
        await showHUD("Paste successed");
        await Clipboard.paste(`[${title}](${URL})`);
        await closeMainWindow({ clearRootSearch: true });
      }
    } else {
      await showHUD("Error!");
      await closeMainWindow({ clearRootSearch: true });
    }
  });
  return;
}
