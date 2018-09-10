// 这个文件由配置生成器生成,请勿手动修改.

import ConfigManager from "../ConfigManager";
import CSVReader from "../CSVReader";

class line
{
	/** ID */
	public  ID:string;
	/** 名字 */
	public  name:string;

}

/** ID */
export default class test
{
	private static _instance = null;
	/** ID */
	public static _ID="ID";
	/** 名字 */
	public static _name="name";


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
			_line.ID = test.Instance.getstringById(id, this._ID);
			_line.name = test.Instance.getstringById(id, this._name);

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
        if(test._instance == null)
        {
            test._instance = ConfigManager.GetCsvData("test");
        }
        return test._instance;
    }
}