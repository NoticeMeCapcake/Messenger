from pathlib import Path
import os

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    work_dir = Path(current_dir + "\\target\\js").__str__()
    src_dir = Path(current_dir + "\\react_project\\src").__str__()
    p = Path(work_dir)
    for file in p.rglob("*.js"):
        file_trimmed = file.__str__().removeprefix(work_dir)
        opened_file = file.open("r+")
        file_content = opened_file.readlines()
        variable_line = file_content[1]
        file_content.pop(1)
        file_content.append("export " + variable_line)
        opened_file.close()
        temp_file = open("temp.txt", "w+")
        temp_file.writelines(file_content)
        temp_file.close()
        temp_path = Path("temp.txt")
        dir_path = Path(src_dir + file.parents[0].__str__().removeprefix(work_dir))
        os.makedirs(dir_path, exist_ok=True)
        temp_path.replace(src_dir + file_trimmed)
