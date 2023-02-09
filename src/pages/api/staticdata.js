import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  //Find the absolute path of the  directory
  const jsDirectory = path.join(process.cwd(), "_data/cinemaHalls/");
  //Read the  data file
  const fileContents = await fs.readFile(
    jsDirectory + "/CinemaHall.js",
    "utf8"
  );
  //Return the content of the data file in json format
  res.status(200).json(fileContents);
}
