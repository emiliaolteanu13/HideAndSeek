namespace HideAndSeek.Utils {
    public static class CRC
    {
        public static UInt32 CalculateWord(UInt32 crc, UInt32 data) 
        {
            crc ^= data;
            for (int i = 0; i < 32; i++)
            {
                if ((crc & 0x80000000) != 0) 
                {
                    crc = (crc << 1) ^ 0x04C11DB7;
                }
                else
                {
                    crc <<= 1;
                }
            }
            return crc;
        }
        public static byte[] CalculateBuffer(byte[] initialValueInBytes)
        {
            UInt32[] buffer = new UInt32[] { 0x12345678 };
            var initialValue = BitConverter.ToUInt32(initialValueInBytes, 0);
            for ( int i = 0; i < buffer.Length; i++)
            {
                initialValue = CalculateWord(initialValue, buffer[i]);
            }
            return BitConverter.GetBytes(initialValue);
        }

    }
}

