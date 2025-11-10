//Dummy data (Note: AI generation was used for the dummy values in tblTopic)
//Max key length is 767 bytes (hence "VARCHAR(191)")
const createTablesScript = () => {
    return `
    CREATE TABLE IF NOT EXISTS tblUser (
        UserID INT PRIMARY KEY AUTO_INCREMENT,
        Email VARCHAR(191) UNIQUE NOT NULL,
        Password TEXT NOT NULL,
        Role VARCHAR(20) NOT NULL,
        AccountStatus BOOLEAN DEFAULT TRUE,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME DEFAULT NULL
    );

    CREATE TABLE IF NOT EXISTS tblTodo (
        TodoID INT PRIMARY KEY AUTO_INCREMENT,
        Title VARCHAR(191) NOT NULL,
        Description TEXT,
        Status VARCHAR(191) DEFAULT 'pending',
        AssignedTo INT NOT NULL,
        ProjectID INT,
        Priority VARCHAR(20),
        DueDate DATETIME,
        CreatedBy INT NOT NULL,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME DEFAULT NULL
    );

    CREATE TABLE IF NOT EXISTS tblTopic (
        TopicID INT PRIMARY KEY AUTO_INCREMENT,
        Title VARCHAR(191) NOT NULL,
        Description TEXT,
        CreatedBy INT NOT NULL,
        IsLocked BOOLEAN DEFAULT FALSE,
        IsPinned BOOLEAN DEFAULT FALSE,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME DEFAULT NULL
    );

    CREATE TABLE IF NOT EXISTS tblPost (
        PostID INT PRIMARY KEY AUTO_INCREMENT,
        TopicID INT NOT NULL,
        Content TEXT NOT NULL,
        AuthorID INT NOT NULL,
        IsEdited BOOLEAN DEFAULT FALSE,
        CanBeShared BOOLEAN DEFAULT TRUE,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME DEFAULT NULL
    );
    `
};

const DropTablesScript = () => {
    return `
    DROP TABLE IF EXISTS tblUser;
    DROP TABLE IF EXISTS tblPost;
    DROP TABLE IF EXISTS tblTopic;
    DROP TABLE IF EXISTS tblTodo;`
}

const InsertValuesScript = () => {
    return  `INSERT INTO tblUser
    VALUES
    (1, 'joe@make-it-all.co.uk', '$2b$12$KkEuKghwWkpsQz0LsEGazePlJNLLQCvJYGY3sGJQzgpGYoiM2vU6C', 'ADMIN', 1, '2023-10-01 09:29:56', '2025-10-30 10:01:46'),
    (2, 'jane@make-it-all.co.uk', '$2b$12$iOQDY2QFOWXL1lyOHQm.KO338oF.hzUrNIv5bXW4OCk2vCRyDwfhi', 'MANAGER', 0, '2023-10-01 13:30:15', '2025-10-29 17:29:52'),
    (3, 'lucas@make-it-all.co.uk', '$2b$12$J7Dnxx6eiFMprUBzKV.tr.wW5IxtqnWxRAw4LM55BIDodvsLvga.6', 'TECHNICAL_SPECIALIST', 1, '2023-10-02 08:15:42', '2025-10-31 14:45:33'),
    (4, 'maya@make-it-all.co.uk', '$2b$12$ThlP7ZVCRtl8mLZ0gsK2E.zVXi5VCE4gIVyi871f7XkX.hfpAbvgK', 'PROJECT_MANAGER', 0, '2024-07-16 11:22:10', '2025-10-28 09:12:47'),
    (5, 'jordan@make-it-all.co.uk', '$2b$12$3LPM3WlIZvQdKBuClx.4tO9qIwPmUTYyiOzGrb6vxjWCEGJ9X39dS', 'TECHNICAL_SPECIALIST', 0, '2024-08-05 15:40:28', '2025-10-27 16:55:21'),
    (6, 'evelyn@make-it-all.co.uk', '$2b$12$LhmPc7Z8wH2VK7IayUe7j.k7RB3O8vP1q2wc6jnUQ.asP9qL1hL1u', 'PROJECT_MANAGER', 1, '2024-09-10 10:05:33', '2025-10-31 11:30:15'),
    (7, 'trevor@make-it-all.co.uk', '$2b$12$lneWZPX5abdplO7ylmpL.OkqO3q56qEszJvgwBOVdAwmjX0rYctya', 'TECHNICAL_SPECIALIST', 0, '2025-02-10 09:45:50', '2025-10-29 14:20:40'),
    (8, 'aisha@make-it-all.co.uk', '$2b$12$66TvnOEBLmzWyO6nrzjSjuecqLHulzD2O1jRs5NrcvAMkcmddoUl2', 'TECHNICAL_SPECIALIST', 1, '2025-03-22 14:18:05', '2025-10-30 12:10:55'),
    (9, 'dominic@make-it-all.co.uk', '$2b$12$dLD7TIxPNeQXjMI8LGItIu1y3EOufgZWzYFJDVpKjuYliQAVazI3K', 'TECHNICAL_SPECIALIST', 0, '2025-04-15 16:30:27', '2025-10-18 19:39:45'),
    (10, 'serena@make-it-all.co.uk', '$2b$12$hpwEm1yAwfQkj49tgh7aZuyS/roebvWnVXx72KmQ5XqGLNHDFT8vO', 'TECHNICAL_SPECIALIST', 0, '2025-05-30 11:55:12', '2025-10-20 08:25:30'),
    (11, 'bisah@make-it-all.co.uk', '$2b$12$rqNtzv/Ujmagbuepp6WThelwDvArtZhttbu81sqh11VJzhKHS/NAe', 'TECHNICAL_SPECIALIST', '1', '2025-10-01 09:00:07', '2025-10-31 17:50:45')
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

    INSERT INTO tblTodo
    VALUES
    (10001, 'Re-design Database Schema', 'Create an efficient database schema for the new project management tool.', 'in_progress', 1, 1001, 'HIGH', '2023-11-15 10:00:00', 1, '2025-08-01 11:45:52', '2025-10-31 17:58:36'),
    (10002, 'Implement Authentication Module', 'Develop a secure authentication module with JWT and OAuth2 support.', 'pending', 2, 1002, 'MEDIUM', '2023-12-01 09:30:00', 2, '2025-08-05 14:20:10', '2025-10-30 10:15:22'),
    (10003, 'Order New Toolboxes', 'Research and order new toolboxes for the technical team.', 'completed', 3, 1003, 'LOW', '2023-10-20 16:00:00', 3, '2025-09-10 08:15:33', '2025-10-29 12:40:55'),
    (10004, 'Set Up Development Environment', 'Configure IDEs, linters, and version control for the development team.', 'in_progress', 4, 1004, 'HIGH', '2023-11-05 14:00:00', 4, '2025-09-15 10:30:45', '2025-10-28 09:55:12'),
    (10005, 'Conduct User Training Sessions', 'Organize training sessions for end-users on the new project management tool.', 'pending', 5, 1005, 'MEDIUM', '2023-12-10 11:00:00', 5, '2025-10-01 13:45:20', '2025-10-27 15:30:50'),
    (10006, 'Optimize Database Queries', 'Analyze and optimize slow database queries to improve performance.', 'in_progress', 6, 1006, 'HIGH', '2023-11-20 15:30:00', 6, '2025-10-05 09:25:15', '2025-10-31 11:05:35'),
    (10007, 'Update Project Documentation', 'Revise and update the project documentation for the new features added.', 'pending', 7, 1007, 'LOW', '2023-12-15 10:30:00', 7, '2025-10-10 14:40:50', '2025-10-29 13:15:25'),
    (10008, 'Implement Notification System', 'Develop a notification system to alert users of important updates.', 'in_progress', 8, 1008, 'MEDIUM', '2023-11-25 09:00:00', 8, '2025-10-12 16:55:05', '2025-10-30 09:45:15'),
    (10009, 'Perform Security Audit', 'Conduct a comprehensive security audit of the application and infrastructure.', 'pending', 9, 1009, 'HIGH', '2023-12-20 13:00:00', 9, '2025-10-15 11:10:30', '2025-10-18 18:20:40'),
    (10010, 'Plan Team Building Activities', 'Organize team building activities to enhance collaboration and morale.', 'completed', 10, 1010, 'LOW', '2023-10-30 12:00:00', 10, '2025-10-20 09:35:45', '2025-10-20 08:30:55')
    ;
    `
}

//DML Scripts:
//1. Select all Manager and Project Manager emails and roles from tblUsers
const selectEmailRoleScript = () => {
    return `SELECT Email, Role FROM tblUser WHERE (Role='MANAGER' OR Role='PROJECT_MANAGER')`
}

//2. Select the UserIDs, emails and roles and To-Do IDs (alongside To-Do Titles)
//  of everyone with completed To-Do Lists
const selectCompletedListsScript = () => {
    return `
    SELECT 
        tblUser.UserID,
        tblUser.Email,
        tblUser.Role,
        tblTodo.TodoID AS 'To-Do ID',
        tblTodo.Title AS 'Topic Title'
    FROM 
        tblUser INNER JOIN tblTodo ON tblUser.UserID = tblTodo.AssignedTo
    WHERE 
        Status = 'completed'
    ;
    `
}

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
        AND tblUser.Role = 'PROJECT_MANAGER'
    ;
    `
}


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
        tblTodo.TodoID,
        tblTodo.Status
    FROM tblUser
        INNER JOIN tblPost ON tblUser.UserID = tblPost.AuthorID
        INNER JOIN tblTopic ON tblPost.TopicID = tblTopic.TopicID
        INNER JOIN tblTodo ON tblUser.UserID = tblTodo.AssignedTo
    WHERE
        tblPost.IsEdited = 1
        AND tblTopic.IsPinned = 0
        AND tblUser.Role IN ("MANAGER", "ADMIN")
        AND tblTodo.Status = 'pending'
    ;
    `
}

export { 
    //DDL
    createTablesScript,
    InsertValuesScript,
    DropTablesScript,

    //DML
    selectEmailRoleScript,
    selectCompletedListsScript,
    selectPostsScript,
    selectConditonFourScript
};
