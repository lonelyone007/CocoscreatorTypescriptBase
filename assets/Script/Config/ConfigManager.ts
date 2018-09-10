// 这个文件由配置生成器生成,请勿手动修改.

import { CSVReader } from "./CSVReader";
import { Config } from "./Config";

export default class ConfigManager {
    private static csvCache = {};

    static InitSync(config: Config) {
        try {
            ConfigManager.csvCache["test"] = new CSVReader("test").LoadSync(config.test);

        } catch (error) {
            console.log(error);
        }
    }

    static get CsvCache() {
        return ConfigManager.csvCache;
    }

    static GetCsvData(csvfile) {
        let data = ConfigManager.csvCache[csvfile];
        return data;
    }

    public static Clear() {
        ConfigManager.csvCache = {};
    }
}