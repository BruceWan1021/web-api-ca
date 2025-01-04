const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchAPI = async (endpoint, options = {}, requiresAuth = false) => {
    const url = `${BASE_URL}${endpoint}`; // 动态生成完整的请求 URL
    const token = window.localStorage.getItem('token'); // 从 localStorage 获取 token

    // 动态添加请求头
    const headers = {
        'Content-Type': 'application/json',
        ...(requiresAuth && token ? { Authorization: token } : {}),
        ...options.headers, // 合并自定义 headers
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        // 检查响应状态
        if (!response.ok) {
            const errorText = await response.text(); // 获取详细的错误信息
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        return await response.json(); // 返回 JSON 数据
    } catch (error) {
        console.error('Error in fetchAPI:', error.message);
        throw error; // 抛出错误供调用方处理
    }
};
