// 这个文件由配置生成器生成,请勿手动修改.

import ConfigManager from "../ConfigManager";
import CSVReader from "../CSVReader";

class line
{
//TheReservedValueText
}

//ReservedTextName
export default class defaultclass
{
	private static _instance = null;
//TheReservedText

    private static m_datadic = {};
    public static getline(id) : line
    {
        if (this.m_datadic[id] != null)
        {
            return this.m_datadic[id];
        }
        else
        {
            var _line = new line();
//TheReservedInitializeText
            this.m_datadic[id] = _line;
            return _line;
        }
    }

    static getlines() : line[]
    {
        return this.Instance.DataList as line[];
    }
    
	static get Instance() : CSVReader
	{
        if(defaultclass._instance == null)
        {
            defaultclass._instance = ConfigManager.GetCsvData("defaultclass");
        }
        return defaultclass._instance;
    }
}