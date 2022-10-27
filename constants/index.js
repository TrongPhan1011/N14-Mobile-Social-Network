export const DEFAULT_MESSAGE_PARAMS = {
    page: 0,
    size: 20,
};
export const REACTIONS = ['👍', '♥️', '😄', '😲', '😭', '😡'];

export const DEFAULT_COVER_IMAGE =
    'https://res.cloudinary.com/depjgf4uu/image/upload/v1633711296/wallhaven-8ok7vk_fsct6y.jpg';
export const NO_INTERNET_IMAGE = 'https://res.cloudinary.com/depjgf4uu/image/upload/v1633875955/no-internet_sgdpzu.png';
export const EMPTY_IMAGE = 'https://res.cloudinary.com/depjgf4uu/image/upload/v1633875942/empty_nvkxrb.png';

export const ERROR_MESSAGE = 'Đã có lỗi xảy ra';
export const LEAVE_GROUP_MESSAGE = 'Bạn có muốn rời nhóm không?';
export const DELETE_GROUP_MESSAGE = 'Toàn bộ nội dung cuộc trò chuyện sẽ bị xóa, bạn có chắc chắn muốn xóa ?';

export const messageType = {
    ALL: 'ALL',
    TEXT: 'TEXT',
    HTML: 'HTML',
    NOTIFY: 'NOTIFY',
    IMAGE: 'IMAGE',
    VIDEO: 'VIDEO',
    FILE: 'FILE',
    VOTE: 'VOTE',
    STICKER: 'STICKER',
    PIN_MESSAGE: 'PIN_MESSAGE',
    NOT_PIN_MESSAGE: 'NOT_PIN_MESSAGE',
    CREATE_CHANNEL: 'CREATE_CHANNEL',
    DELETE_CHANNEL: 'DELETE_CHANNEL',
    UPDATE_CHANNEL: 'UPDATE_CHANNEL',
    ADD_MANAGERS: 'ADD_MANAGERS',
    DELETE_MANAGERS: 'DELETE_MANAGERS',
    GROUPCHAT: 'GROUPCHAT',
};

export const friendType = {
    FRIEND: 'FRIEND',
    FOLLOWER: 'FOLLOWER',
    YOU_FOLLOW: 'YOU_FOLLOW',
    NOT_FRIEND: 'NOT_FRIEND',
    NOT_FRIEND: 'NOT_FRIEND',
    DONT_HAVE_ACCOUNT: 'DONT_HAVE_ACCOUNT',
    ADD_TO_GROUP: 'ADD_TO_GROUP',
    REMOVE_FROM_GROUP: 'REMOVE_FROM_GROUP',
};

export const memberType = {
    LEADER: 'LEADER',
    DEPUTY_LEADER: 'DEPUTY_LEADER',
    MEMBER: 'MEMBER',
};
