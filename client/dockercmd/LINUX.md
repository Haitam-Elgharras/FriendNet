# Some linux commands

- `apt update` - Update the package list, we should run this command before installing any package
- `apt install <package-name>` - Install a package
- `apt remove <package-name>` - Remove a package
- `apt upgrade` - Upgrade all the packages

# update delete move and rename remove files and directories

- `mv <source> <destination>` - Move a file or directory or rename a file or directory
- `rm <file-name>` - Remove a file
- `rm -r <directory-name>` - Remove a directory
- `rm -f <file-name>` - Force remove a file
- `rm -rf <directory-name>` - Force remove a directory
- `less <file-name>` - View the contents of a file with the ability to scroll up and down
- `cat <file-name>` - View the contents of a file
- `grep <search-term> <file-name>` - Search for a term in a file
- `grep -ir <search-term> <directory-name>` - Search for a term in a directory and its subdirectories ignoring case

- `find <directory-name> -iname <file-name>` - Find a file in a directory ignoring case, two params there -i and -name.
- `find <directory-name> -type f` - Find all files in a directory
- `find <directory-name> -type d` - Find all directories in a directory
- example: find all the python files in this ubuntu image and then redirect the output to a file python-files.txt
- `find / -type f -name "*.py" > python-files.txt`

The && and || operators.

- `command1 && command2` - still running commands until a command fails
- `command1 || command2` - running commands until a command succeeds

Pipe operator

- view the contents of the /bin directory with the ability to scroll up and down.
  `ls /bin | less ` this is a work around for the less command, cause it doesn't work with directories

Environment Variables

- printenv - Print all environment variables
- echo $<variable-name> - Print the value of a specific environment variable
- PATH - The environment variable that specifies the directories in which executable programs are located
- `export <variable-name>=<variable-value>` - Create a new volatile environment variable, if we want to make it permanent we should add it to the .bashrc file
- .bashrc - The file that is executed whenever a new terminal is opened and it's specific to the user for storing environment variables
  `echo DB_USER=app >> .bashrc` - Append the DB_USER environment variable to the .bashrc file.
- after appending the .bashrc file we should run the `source .bashrc` command to apply the changes or open a new terminal.

Processes

- `ps` - List all running processes
- `ps -ef` - List all running processes in detail
- `kill <process-id>` - Terminate a process
- `kill -9 <process-id>` - Force terminate a process
- `sleep <seconds>` - Suspend the execution of a process for a specified time

Manage Users

- `adduser <username>` - Add a new user in an interactive way
- `useradd <username>` - Add a new user in a non-interactive way
- `usermod <username>` - Modify an existing user
- `userdel <username>` - Delete a user
- `passwd <username>` - Change the password of a user
- `su <username>` - Switch to another user
- `usermod -s /bin/bash <username>` - Change the default shell of a user to bash
- `docker exec -it -u <username> <container-id> bash` - Open a new terminal in the same ubuntu image as a specific user, by default it's root.

# Managing groups

- `groupadd <group-name>` - Add a new group
- `groupmod <group-name>` - Modify an existing group
- `groupdel <group-name>` - Delete a group
- `usermod -G <group-name> <username>` - Add a user to a group
- `usermod -g <group-name> <username>` - Change the primary group of a user
- `groups <username>` - List all groups a user belongs to
- `grep <group-name> /etc/passwd` - search for a user in a group

# Managing File Permissions

- `chmod ugo+rwx <file-name>` - Change the permissions of a file u for current user, g for group, o for others, we can combine them or just one of them, the same for rwx and files.
- `chmod 777 <file-name>` - Change the permissions of a file to rwx.
- `*.sh` - All files with the .sh extension are executable.
- `./<file-name>.sh` - Execute a shell script
