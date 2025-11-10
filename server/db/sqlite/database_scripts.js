//Dummy data (Note: AI generation was used for the dummy values in tblTopic)
const createTablesScript = () => {
  return `
    CREATE TABLE tblUser (
        UserID INTEGER PRIMARY KEY AUTOINCREMENT,
        Email TEXT NOT NULL UNIQUE,
        Password TEXT NOT NULL,
        Role TEXT NOT NULL CHECK(Role IN ('user', 'manager', 'admin', 'technical_specialist', 'project_manager')) DEFAULT 'user',
        AccountStatus INTEGER NOT NULL DEFAULT 1 CHECK(AccountStatus IN (0, 1)),
        CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE tblTopic (
        TopicID INTEGER PRIMARY KEY AUTOINCREMENT,
        Title TEXT NOT NULL CHECK(LENGTH(Title) <= 191 AND LENGTH(Title) > 0),
        Description TEXT,
        CreatedBy INTEGER NOT NULL,
        IsLocked INTEGER NOT NULL DEFAULT 0 CHECK(IsLocked IN (0, 1)),
        IsPinned INTEGER NOT NULL DEFAULT 0 CHECK(IsPinned IN (0, 1)),
        CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (CreatedBy) REFERENCES tblUser(UserID) ON DELETE CASCADE
    );

    -- posts within topics
    CREATE TABLE tblPost (
        PostID INTEGER PRIMARY KEY AUTOINCREMENT,
        TopicID INTEGER NOT NULL,
        Content TEXT NOT NULL CHECK(LENGTH(Content) > 0),
        AuthorID INTEGER NOT NULL,
        IsEdited INTEGER NOT NULL DEFAULT 0 CHECK(IsEdited IN (0, 1)),
        CanBeShared INTEGER NOT NULL DEFAULT 1 CHECK(CanBeShared IN (0, 1)),
        CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (TopicID) REFERENCES tblTopic(TopicID) ON DELETE CASCADE,
        FOREIGN KEY (AuthorID) REFERENCES tblUser(UserID) ON DELETE CASCADE
    );

    CREATE TABLE proj_tasks (
        TaskID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserID INTEGER NOT NULL,
        Title TEXT NOT NULL CHECK(LENGTH(Title) <= 191 AND LENGTH(Title) > 0),
        Description TEXT,
        Status TEXT NOT NULL CHECK(Status IN ('pending', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
        Priority TEXT CHECK(Priority IN ('low', 'medium', 'high', 'urgent')),
        DueDate DATETIME,
        TimeSpent INTEGER NOT NULL DEFAULT 0 CHECK(TimeSpent >= 0),
        CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserID) REFERENCES tblUser(UserID) ON DELETE CASCADE
    );

    CREATE TABLE user_todo (
        TaskID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserID INTEGER NOT NULL,
        Title TEXT NOT NULL CHECK(LENGTH(Title) <= 191 AND LENGTH(Title) > 0),
        Description TEXT,
        Status TEXT NOT NULL CHECK(Status IN ('pending', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
        Priority TEXT CHECK(Priority IN ('low', 'medium', 'high', 'urgent')),
        DueDate DATETIME,
        TimeSpent INTEGER NOT NULL DEFAULT 0 CHECK(TimeSpent >= 0),
        CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserID) REFERENCES tblUser(UserID) ON DELETE CASCADE
    );`;
};

const DropTablesScript = () => {
  return `
    DROP TABLE IF EXISTS tblUser;
    DROP TABLE IF EXISTS tblPost;
    DROP TABLE IF EXISTS tblTopic;
    DROP TABLE IF EXISTS user_todo;`;
};

const InsertValuesScript = () => {
  // TODO: change these cause ai made the hashes...
  return `    INSERT INTO tblUser
    VALUES
    (1, 'joe@make-it-all.co.uk', '$2b$12$KkEuKghwWkpsQz0LsEGazePlJNLLQCvJYGY3sGJQzgpGYoiM2vU6C', 'admin', 1, '2023-10-01 09:29:56', '2025-10-30 10:01:46'),
    (2, 'jane@make-it-all.co.uk', '$2b$12$iOQDY2QFOWXL1lyOHQm.KO338oF.hzUrNIv5bXW4OCk2vCRyDwfhi', 'manager', 0, '2023-10-01 13:30:15', '2025-10-29 17:29:52'),
    (3, 'lucas@make-it-all.co.uk', '$2b$12$J7Dnxx6eiFMprUBzKV.tr.wW5IxtqnWxRAw4LM55BIDodvsLvga.6', 'technical_specialist', 1, '2023-10-02 08:15:42', '2025-10-31 14:45:33'),
    (4, 'maya@make-it-all.co.uk', '$2b$12$ThlP7ZVCRtl8mLZ0gsK2E.zVXi5VCE4gIVyi871f7XkX.hfpAbvgK', 'project_manager', 0, '2024-07-16 11:22:10', '2025-10-28 09:12:47'),
    (5, 'jordan@make-it-all.co.uk', '$2b$12$3LPM3WlIZvQdKBuClx.4tO9qIwPmUTYyiOzGrb6vxjWCEGJ9X39dS', 'technical_specialist', 0, '2024-08-05 15:40:28', '2025-10-27 16:55:21'),
    (6, 'evelyn@make-it-all.co.uk', '$2b$12$LhmPc7Z8wH2VK7IayUe7j.k7RB3O8vP1q2wc6jnUQ.asP9qL1hL1u', 'project_manager', 1, '2024-09-10 10:05:33', '2025-10-31 11:30:15'),
    (7, 'trevor@make-it-all.co.uk', '$2b$12$lneWZPX5abdplO7ylmpL.OkqO3q56qEszJvgwBOVdAwmjX0rYctya', 'technical_specialist', 0, '2025-02-10 09:45:50', '2025-10-29 14:20:40'),
    (8, 'aisha@make-it-all.co.uk', '$2b$12$66TvnOEBLmzWyO6nrzjSjuecqLHulzD2O1jRs5NrcvAMkcmddoUl2', 'technical_specialist', 1, '2025-03-22 14:18:05', '2025-10-30 12:10:55'),
    (9, 'dominic@make-it-all.co.uk', '$2b$12$dLD7TIxPNeQXjMI8LGItIu1y3EOufgZWzYFJDVpKjuYliQAVazI3K', 'technical_specialist', 0, '2025-04-15 16:30:27', '2025-10-18 19:39:45'),
    (10, 'serena@make-it-all.co.uk', '$2b$12$hpwEm1yAwfQkj49tgh7aZuyS/roebvWnVXx72KmQ5XqGLNHDFT8vO', 'technical_specialist', 0, '2025-05-30 11:55:12', '2025-10-20 08:25:30'),
    (11, 'bisah@make-it-all.co.uk', '$2b$12$rqNtzv/Ujmagbuepp6WThelwDvArtZhttbu81sqh11VJzhKHS/NAe', 'technical_specialist', 1, '2025-10-01 09:00:07', '2025-10-31 17:50:45')
    ;

    INSERT INTO tblPost
    VALUES
    (1, 1, 'I think we should normalize the database to reduce redundancy.', 1, 0, 1, '2023-10-05 10:20:00', '2025-10-30 12:05:00'),
    (2, 2, 'JWT is a great option for stateless authentication.', 2, 1, 0, '2023-11-12 14:45:00', '2025-10-29 16:00:00'),
    (3, 3, 'I recommend using VSCode with relevant extensions for development.', 3, 0, 1, '2023-09-20 09:15:00', '2025-10-28 11:30:00'),
    (4, 4, 'Setting up Docker can help maintain consistent development environments.', 4, 1, 0, '2023-12-01 17:00:00', '2025-10-31 10:20:00'),
    (5, 5, 'Hands-on training sessions are more effective than just documentation.', 5, 0, 1, '2024-01-15 11:45:00', '2025-10-27 15:40:00')
    ;

    INSERT INTO tblTopic
    VALUES
    (1, 'Database Schema Design', 'Discussion on best practices for designing database schemas.', 1, 0, 1, '2023-10-05 10:15:00', '2025-10-30 12:00:00'),
    (2, 'Authentication Methods', 'Exploring various authentication methods for web applications.', 2, 0, 0, '2023-11-12 14:30:00', '2025-10-29 15:45:00'),
    (3, 'Toolbox Recommendations', 'Sharing recommendations for essential tools and toolboxes.', 3, 1, 0, '2023-09-20 09:00:00', '2025-10-28 11:20:00'),
    (4, 'Development Environment Setup', 'Tips and tricks for setting up an efficient development environment.', 4, 0, 1, '2023-12-01 16:45:00', '2025-10-31 10:10:00'),
    (5, 'User Training Strategies', 'Effective strategies for training users on new software tools.', 5, 1, 0, '2024-01-15 11:30:00', '2025-10-27 14:55:00'),
    (6, 'Database Performance Optimization', 'Techniques for optimizing database performance and query efficiency.', 6, 0, 0, '2024-02-28 13:15:00', '2025-10-30 09:35:00'),
    (7, 'Project Documentation Best Practices', 'Best practices for creating and maintaining project documentation.', 7, 1, 1, '2024-03-10 15:00:00', '2025-10-29 16:20:00'),
    (8, 'Notification System Implementation', 'Designing and implementing notification systems for applications.', 8, 0, 0, '2024-04-22 10:45:00', '2025-10-28 12:30:00'),
    (9, 'Security Audit Procedures', 'Comprehensive procedures for conducting security audits.', 9, 1, 0, '2024-05-18 14:20:00', '2025-10-31 14:15:00'),
    (10, 'Team Building Activities', 'Ideas and activities for effective team building.', 10, 0, 1, '2024-06-30 09:10:00', '2025-10-20 10:05:00')
    ;

    INSERT INTO user_todo
    VALUES
    (10001, 1, 'Re-design Database Schema', 'Create an efficient database schema for the new project management tool.', 'in_progress', 'HIGH', '2023-11-15 10:00:00', 1, '2025-08-01 11:45:52', '2025-10-31 17:58:36'),
    (10002, 2, 'Implement Authentication Module', 'Develop a secure authentication module with JWT and OAuth2 support.', 'pending', 'MEDIUM', '2023-12-01 09:30:00', 2, '2025-08-05 14:20:10', '2025-10-30 10:15:22'),
    (10003, 3, 'Order New Toolboxes', 'Research and order new toolboxes for the technical team.', 'completed', 'LOW', '2023-10-20 16:00:00', 3, '2025-09-10 08:15:33', '2025-10-29 12:40:55'),
    (10004, 4, 'Set Up Development Environment', 'Configure IDEs, linters, and version control for the development team.', 'in_progress', 'HIGH', '2023-11-05 14:00:00', 4, '2025-09-15 10:30:45', '2025-10-28 09:55:12'),
    (10005, 5, 'Conduct User Training Sessions', 'Organize training sessions for end-users on the new project management tool.', 'pending', 'MEDIUM', '2023-12-10 11:00:00', 5, '2025-10-01 13:45:20', '2025-10-27 15:30:50'),
    (10006, 6, 'Optimize Database Queries', 'Analyze and optimize slow database queries to improve performance.', 'in_progress', 'HIGH', '2023-11-20 15:30:00', 6, '2025-10-05 09:25:15', '2025-10-31 11:05:35'),
    (10007, 7, 'Update Project Documentation', 'Revise and update the project documentation for the new features added.', 'pending', 'LOW', '2023-12-15 10:30:00', 7, '2025-10-10 14:40:50', '2025-10-29 13:15:25'),
    (10008, 8, 'Implement Notification System', 'Develop a notification system to alert users of important updates.', 'in_progress', 'MEDIUM', '2023-11-25 09:00:00', 8, '2025-10-12 16:55:05', '2025-10-30 09:45:15'),
    (10009, 9, 'Perform Security Audit', 'Conduct a comprehensive security audit of the application and infrastructure.', 'pending', 'HIGH', '2023-12-20 13:00:00', 9, '2025-10-15 11:10:30', '2025-10-18 18:20:40'),
    (10010, 10, 'Plan Team Building Activities', 'Organize team building activities to enhance collaboration and morale.', 'completed', 'LOW', '2023-10-30 12:00:00', 10, '2025-10-20 09:35:45', '2025-10-20 08:30:55')
    ;
    `;
};

//DML Scripts:
//1. Select all Manager and Project Manager emails and roles from tblUsers
const selectEmailRoleScript = () => {
  return `SELECT Email, Role FROM tblUser WHERE (Role='manager' OR Role='project_manager')`;
};

//2. Select the UserIDs, emails and roles and To-Do IDs (alongside To-Do Titles)
//  of everyone with completed To-Do Lists
const selectCompletedListsScript = () => {
  return `
    SELECT 
        tblUser.UserID,
        tblUser.Email,
        tblUser.Role,
        user_todo.TaskID AS 'To-Do ID',
        user_todo.Title AS 'To-Do Title'
    FROM 
        tblUser INNER JOIN user_todo ON tblUser.UserID = user_todo.UserID
    WHERE 
        Status = 'completed'
    ;
    `;
};

//3. Select all updated posts of each pinned topic from Project Managers only
const selectPostsScript = () => {
  return `
    SELECT
        tblPost.PostID,
        tblPost.Content,
        tblPost.UpdatedAt,
        tblUser.Email AS "Author Email",
        tblTopic.Title AS "Topic Title"
    FROM tblPost
        INNER JOIN tblUser ON tblPost.AuthorID = tblUser.UserID
        INNER JOIN tblTopic ON tblPost.TopicID = tblTopic.TopicID
    WHERE
        tblTopic.IsPinned = 1
        AND tblPost.UpdatedAt IS NOT NULL
        AND tblUser.Role = 'project_manager'
    ;
    `;
};

//4. Select all edited and unpinned posts and topics of manager and admin owners
//  with pending to-do lists.
const selectConditonFourScript = () => {
  return `
    SELECT
        tblUser.UserID,
        tblUser.Email,
        tblUser.Role,
        tblPost.PostID,
        tblPost.Content,
        tblTopic.Title AS "Topic Title",
        user_todo.TaskID,
        user_todo.Status
    FROM tblUser
        INNER JOIN tblPost ON tblUser.UserID = tblPost.AuthorID
        INNER JOIN tblTopic ON tblPost.TopicID = tblTopic.TopicID
        INNER JOIN user_todo ON tblUser.UserID = user_todo.UserID
    WHERE
        tblPost.IsEdited = 1
        AND tblTopic.IsPinned = 0
        AND tblUser.Role IN ("manager", "admin")
        AND user_todo.Status = 'pending'
    ;
    `;
};

export {
  //DDL
  createTablesScript,
  InsertValuesScript,
  DropTablesScript,

  //DML
  selectEmailRoleScript,
  selectCompletedListsScript,
  selectPostsScript,
  selectConditonFourScript,
};
