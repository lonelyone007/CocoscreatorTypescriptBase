/********************************************************************
 created:    2015/07/06  16:54
 file base:    CSVReader
 file ext:    cs
 author:        github tikonen

 purpose:    CSV的读取，只需要将csv文件放置在Resource下某目录即可，比如放在resource/data下，那么：
 CSVReader testReader = new CSVReader();
 testReader.Load("data/example");
 testReader.PrintData();
 string testValue = testReader.getById("1", "name");
 int testIntValue = testReader.getIntById("2", "age");
 float testFloatValue = testReader.getFloatById("3", "speed");
 *********************************************************************/

export class CSVReader {
    // static const SPLIT_RE = ",(?=(?:[^""]*""[^""]*"")*(?![^""]*""))";
    // static const LINE_SPLIT_RE = "\r\n|\n\r|\n|\r";
    private static readonly SPLIT = "#";
    private static readonly LINE_SPLIT = "\n";

    private _fileName = "";
    private _dataList = [];
    private _dataDic = {};

    constructor(fileName) {
        this._fileName = fileName;
    }

    get DataList(): any[] {
        return this._dataList;
    }

    set DataList(val) {
        this._dataDic = val;
    }

    get keys() {
        return Object.keys(this._dataDic);
    }

    /// <summary>
    /// 载入指定的csv文件，并进行初始化
    /// </summary>
    /// <param name="fileName"></param>
    Load(): Promise<CSVReader> {
        return this.Read(this._fileName);
    }

    LoadSync(file: cc.TextAsset): CSVReader {
        return this.ReadFile(file);
    }

    /// <summary>
    /// 读取指定的csv文件
    /// </summary>
    /// <param name="file"></param>
    /// <returns></returns>
    private Read(file) {
        return new Promise<CSVReader>((resolve, reject) => {
            cc.loader.loadRes(file, (err, data: cc.TextAsset) => {
                if (data != null) {
                    this.ReadFile(data);
                }
                resolve(this);
            });
        });
    }

    private ReadFile(file: cc.TextAsset) {
        const lines = file.text.split(CSVReader.LINE_SPLIT);
        if (lines.length <= 2) return;

        const header = lines[2].split(CSVReader.SPLIT);
        const types = lines[1].split(CSVReader.SPLIT);
        for (let i = 3; i < lines.length; i++) {
            const values = lines[i].split(CSVReader.SPLIT);
            if (values.length == 0 || values[0] == "") continue;

            const entry = {};
            for (let j = 0; j < header.length && j < values.length; j++) {
                header[j] = header[j].replace('\r', '');
                values[j] = values[j].replace('\r', '');
                if (types[j] === 'int') {
                    entry[header[j]] = parseInt(values[j]);
                } else if (types[j] === 'float') {
                    entry[header[j]] = parseFloat(values[j]);
                } else {
                    entry[header[j]] = values[j];
                }
            }
            this._dataDic[entry["ID"]] = entry;
            this._dataList.push(entry);
        }

        return this;
    }

    /// <summary>
    /// 打印数据，用于调试
    /// </summary>
    public PrintData() {
        let stringBuilder = "";
        for (let i = 0; i < this._dataList.length; ++i) {
            for (let key in this._dataList[i]) {
                let valueString = this._dataList[key];
                stringBuilder += valueString;
                stringBuilder += ",";
            }
            stringBuilder += "\n";
        }
    }

    /// <summary>
    /// 通过id和列名获取内容
    /// </summary>
    /// <param name="id"></param>
    /// <param name="typeName"></param>
    /// <returns></returns>
    public getById(id, typeName): string {
        if (this._dataList.length <= 0) {
            return "-1";
        }

        const item = this._dataDic[id][typeName];
        if (item != null)
            return item;
        return "-1";
    }

    public getintById(id, typeName): number {
        let strItm = this.getById(id, typeName);
        return parseInt(strItm);
    }

    public getfloatById(id, typeName): number {
        let strItm = this.getById(id, typeName);
        return parseFloat(strItm);
    }

    public getstringById(id, typeName): string {
        let strItm = this.getById(id, typeName);
        return strItm;
    }

    public getArrayById<T>(id, typeName, convertFunc: (s: string) => T): T[] {
        let strItm = this.getById(id, typeName);
        const s = strItm.split('|').map(v => convertFunc(v));
        return s;
    }
}
