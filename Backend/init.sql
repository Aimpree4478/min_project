-- Create the user table
CREATE TABLE `user` (
    Username VARCHAR(255) PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    Link VARCHAR(255) NOT NULL
);

-- Insert example data
INSERT INTO `user` (Username, Email, Link) VALUES
    ('john_doe', 'john@example.com', 'https://example.com/john'),
    ('jane_smith', 'jane@example.com', 'https://example.com/jane'),
    ('bob_jones', 'bob@example.com', 'https://example.com/bob');

