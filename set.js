const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>',eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0ZCWWU1aU1PUzlVMUdaK3hTaGlsMTRjVFgxVE1xcmo4Y2syRElLWktVST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ2hBSTh5QnVkSEp1aGtyNnFCZ0xDOElZSnNjcHFkSUNoL2xhNlVDL0VoUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXRjFNcVVNU1F1STZ4TWY2YW1LYlMxaXNrb09MQmVPVjFmVTVxYmx0SGtnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUUXo1VXFUdDhYWXcrdzlscFBpSXZmTXI0b251TEJnOWlCN2x3M09iOEhNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVEN2JRelJvVWNjVk9oQ25ESEZneUlEM3pPZGc5azZRcDdlUzl0UHVZMlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhzWXVlZ0FzTkpqT3luQVVUWXpUK2ZobENtV3VML2tFNFhQKzF2SEZhbUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK08zdkVIS2FhMG4wKytWZ25kYWQrMWRNV2M0QUlkQ3dleEhLbFNJQU5YND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicGZWejlTckNwM3dxclZiV0VUS04vQWNlWkpiekZZcUFiaXFwNmpKRStDdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRCUDZSNW45WG5SRmFrNzJEaVgvNzFaa3hJMmxzaTRXbmhkNk9SVTBOT0VEaGVwajBxdzBZSitaTklMZllNTGxWMVJSTFFTY0JuUkd3ai9lSUNPYURBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIyLCJhZHZTZWNyZXRLZXkiOiIrMHRPcUh4VkdQNVFDSFZuQUQ0SCt4Nzc0SlRSTWcvaldpSERSa09GOEFZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJtckpsZ2RIVVJNMkxoQWFySEFzcndnIiwicGhvbmVJZCI6ImI3NjI1NjA3LTdiYmEtNDg2NC04NDg0LThjZmI5OTFkZDQyYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWT0VzeDl5cTR5eitNSlBBVE9TY1E1SHNYV1E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMVJQNWJpZFNCLzVKS3FXN0c2UHlCdHlZZFljPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik5STlI5MUM1IiwibWUiOnsiaWQiOiIyNTU2ODUxODI5NjE6M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLihKTwnZWq8J2VlvCdlZTwnZWZIPCdlY8ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pyVXpQa0NFUEdqc0w0R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InJBbyt2bmxhY0tRQXhacG1aTEpVLyt2UjJYT2ZUL1dERDAyczh3NUJJbkE9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImlaYk9yaWNqV1UyK2RnNVNIWVRkN254dHdIK3dlb1E5bVZadVNMb09sdmpxdVhYRFA5SDBlUUdvcE9UREQydEZNTk9aVW9mMXNtRVlYaEJRNGpiekRnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIyRHZXd0R2bHlQK0ZMV2hrV3RHcVh0SjFmcDBLUHBpVU5iYnNMWDk5aFF5VW9iQkZCS3ZReWM3djY5aDVDTHkvYkJqVmpsc0JGUVZsL2w5NWZoclJDUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTY4NTE4Mjk2MTozQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmF3S1ByNTVXbkNrQU1XYVptU3lWUC9yMGRsem4wLzFndzlOclBNT1FTSncifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDE0MjcxOTgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRG9jIn0=
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_LIKE: process.env.STATUS_LIKE || "off",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    ANTIVIEW: process.env.VIEWONCE,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
