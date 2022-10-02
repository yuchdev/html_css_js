import os
import sys
import platform
from pathlib import Path


# merge_command += " ".join([merge_command + (" --idea-dictionary %s" % d) for d in dictionaries])
def environment_value(environment_name):
    """
    :param environment_name: Name of the environment variable
    :return: Value of the environment variable or the empty string if not exists
    """
    try:
        return os.environ[environment_name]
    except KeyError:
        return ''


def platform_system():
    """
    :return: 
    """
    return platform.system()


def files_with_compare(root_folder, file_name):
    """
    :param root_folder: Directory root project, where from we start looking for dictionaries
    :param file_name: Dictionary file name (should be the same for all IDEA projects)
    :return: List of paths to all dictionaries, including file name
    """
    dictionaries = []
    print("Look for %s in %s" % (file_name, root_folder))
    for path in Path(root_folder).rglob(file_name):
        dictionaries.append(str(path))
    return dictionaries


def debug_exit():
    """
    Interrupt the script for debug purposes
    """
    sys.exit(0)


def main():
    """
    Execute IDEA dictionaries synchronization as a pre-commit hook.
    Applicable to all IDEA-like projects (PyCharm, WebStorm etc)
    :return: System return code
    """
    projects_dir = environment_value("PROJECTS")
    appdata_dir = environment_value("APPDATA")

    if 0 == len(projects_dir):
        print("Environment variable PROJECTS is not found, exiting hook")
        sys.exit(0)

    print("Environment variable PROJECTS=%s" % projects_dir)

    dictionaries_project = os.path.join(projects_dir, "HomeDir/Scripting/dictionaries")
    if not os.path.isdir(dictionaries_project):
        print("Personal IDEA dictionary directory is not found, exiting hook")
        sys.exit(0)

    print("Personal IDEA dictionary location %s" % dictionaries_project)

    python_script = os.path.join(dictionaries_project, "dictionary_merge.py")
    personal_idea_dict = os.path.join(dictionaries_project, "idea/atatat.xml")
    personal_vassist_dict = os.path.join(dictionaries_project, "vassist/Dict/UserWords.txt")

    if not os.path.isfile(python_script):
        print("Python dictionary merge script is not found, exiting hook")
        sys.exit(0)

    if not os.path.isfile(personal_vassist_dict) or not os.path.isfile(personal_idea_dict):
        print("Python dictionary file is not found, exiting hook")
        sys.exit(0)

    idea_dictionaries = files_with_compare(projects_dir, "atatat.xml")
    vassist_dictionaries = files_with_compare(appdata_dir, "UserWords.txt")
    print("Found following dictionaries: {}".format(idea_dictionaries))
    if len(idea_dictionaries) + 1 < 2:
        print("Only %d dictionaries has been found, nothing to merge" % len(idea_dictionaries))
        return 0

    if platform_system() == "Windows":
        python_executable = "python.exe"
    elif platform_system() == "Darwin":
        python_executable = "python3"
    else:
        python_executable = "python"

    merge_command = "%s %s --vassist-dict %s" % (python_executable, python_script, personal_vassist_dict)

    for dictionary in idea_dictionaries:
        merge_command = merge_command + (" --idea-dictionary %s" % dictionary)
    for dictionary in vassist_dictionaries:
        merge_command = merge_command + (" --vassist-dictionary %s" % dictionary)

    return os.system(merge_command)


###########################################################################
if __name__ == '__main__':
    sys.exit(main())
