class RLE:
    def compress(self, data):
        if isinstance(data, str):
            return self._compress_text(data)
        else:
            return self._compress_binary(data)

    def decompress(self, data):
        if isinstance(data, str):
            return self._decompress_text(data)
        else:
            return self._decompress_binary(data)

    def compress_file(self, input_path, output_path):
        if is_text_file(input_path):
            with open(input_path, 'r', encoding='utf-8') as f:
                data = f.read()
            compressed_text = self._compress_text(data)
            with open(output_path, 'wb') as f:
                f.write(compressed_text.encode('utf-8'))
        else:
            with open(input_path, 'rb') as f:
                data = f.read()
            compressed = self._compress_binary(data)
            with open(output_path, 'wb') as f:
                f.write(compressed)

    def decompress_file(self, input_path, output_path):
        if is_text_file(output_path):
            with open(input_path, 'rb') as f:
                data = f.read().decode('utf-8')
            decompressed = self._decompress_text(data)
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(decompressed)
        else:
            with open(input_path, 'rb') as f:
                data = f.read()
            decompressed = self._decompress_binary(data)
            with open(output_path, 'wb') as f:
                f.write(decompressed)
        
        return output_path

    def _compress_text(self, text):
        result = ""
        count = 1
        for i in range(1, len(text)):
            if text[i] == text[i - 1]:
                count += 1
            else:
                result += str(count) + text[i - 1]
                count = 1
        result += str(count) + text[-1]
        return result

    def _decompress_text(self, text):
        result = ""
        count = ""
        for char in text:
            if char.isdigit():
                count += char
            else:
                result += char * int(count)
                count = ""
        return result

    def _compress_binary(self, data):
        result = bytearray()
        count = 1
        for i in range(1, len(data)):
            if data[i] == data[i - 1] and count < 255:
                count += 1
            else:
                result.append(count)
                result.append(data[i - 1])
                count = 1
        result.append(count)
        result.append(data[-1])
        return bytes(result)

    def _decompress_binary(self, data):
        result = bytearray()
        for i in range(0, len(data), 2):
            count = data[i]
            byte = data[i + 1]
            result.extend([byte] * count)
        return bytes(result)


def is_text_file(file_path):
    return file_path.lower().endswith('.txt')
