import ast

class LZ77:
    def __init__(self, window_size=20):
        self.window_size = window_size

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
            compressed = self._compress_text(data)
            with open(output_path, 'wb') as f:
                f.write(compressed.encode('utf-8'))
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
        i = 0
        output = []
        while i < len(text):
            match = ''
            match_index = 0
            for j in range(max(0, i - self.window_size), i):
                k = 0
                while i + k < len(text) and text[j + k] == text[i + k]:
                    k += 1
                    if j + k >= i:
                        break
                if k > len(match):
                    match = text[j:j + k]
                    match_index = i - j
            next_char = text[i + len(match)] if i + len(match) < len(text) else ''
            output.append((match_index, len(match), next_char))
            i += len(match) + 1
        return str(output)

    def _decompress_text(self, compressed):
        compressed = ast.literal_eval(compressed)
        result = ''
        for offset, length, next_char in compressed:
            start = len(result) - offset
            for i in range(length):
                result += result[start + i]
            result += next_char
        return result

    def _compress_binary(self, data):
        i = 0
        output = bytearray()
        while i < len(data):
            match = b''
            match_index = 0
            for j in range(max(0, i - self.window_size), i):
                k = 0
                while i + k < len(data) and data[j + k] == data[i + k]:
                    k += 1
                    if j + k >= i:
                        break
                if k > len(match):
                    match = data[j:j + k]
                    match_index = i - j
            next_byte = data[i + len(match)] if i + len(match) < len(data) else 0
            output.extend([match_index, len(match), next_byte])
            i += len(match) + 1
        return bytes(output)
  

    def _decompress_binary(self, data):
        result = bytearray()
        i = 0
        while i + 2 < len(data):
            offset = data[i]
            length = data[i + 1]
            next_byte = data[i + 2]
            start = len(result) - offset
            for j in range(length):
                result.append(result[start + j])
            result.append(next_byte)
            i += 3
        return bytes(result)



def is_text_file(file_path):
    return file_path.lower().endswith('.txt')
