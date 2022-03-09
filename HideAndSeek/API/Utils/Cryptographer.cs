namespace HideAndSeek.Utils
{
    public static class Cryptographer
    {
        
            public static byte[] EncryptDecrypt(byte[] data, byte[] key)
            {
                if (data == null)
                    throw new ArgumentNullException(nameof(data));

                if (key == null)
                    throw new ArgumentNullException(nameof(key));

                if (key.Length == 0)
                    throw new ArgumentOutOfRangeException("key cannot be empty");

                for (int i = 0; i < data.Length; i++)
                    data[i] = (byte)(data[i] ^ key[i % key.Length]);

                return data;
            }
        
    }
}
