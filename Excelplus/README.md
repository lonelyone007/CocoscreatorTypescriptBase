excel自动生成代码与表格转化的工具, 需要安装python方可使用.

# 使用方法:
	配置好表格后执行命令
	python run.py 或 直接双击 run.py 文件.

# 文件夹说明
	csv_folder: 存放原始配置表.
	extends: 与模版defaultclass区分,若有与表格中sheet对应的文件,则会使用此文件作为模版.
	default: 默认的类模版文件.

# 项目中的调用方法:
	xxx.getline(id).xxx 即可直接使用该行的数据
