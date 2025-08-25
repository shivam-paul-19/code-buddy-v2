import axios from "axios";
import { defaultLines } from "./languages";

const baseURL = "https://emkc.org/api/v2/piston/execute";

export const executeCode = async (source, language) => {
    let body = {
      "language": language,
      "version": defaultLines.get(language).version,
      "files": [
        {
          "content": source,
        },
      ],
    };

    let res = await axios.post(baseURL, body);
    console.log(res);
    return res.data.run.output
}