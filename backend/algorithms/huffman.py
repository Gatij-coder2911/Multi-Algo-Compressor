import heapq

class HuffmanNode:
    def __init__(self, char=None, freq=0):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None

    def __lt__(self, other):
        return self.freq < other.freq

class HuffmanCoding:
    def __init__(self):
        self.codes = {}
        self.rev_codes = {}

    def build_freq_table(self, text):
        freq_table = {}
        for char in text:
            freq_table[char] = freq_table.get(char, 0) + 1
        return freq_table

    def build_heap(self, freq_table):
        heap = [HuffmanNode(char, freq) for char, freq in freq_table.items()]
        heapq.heapify(heap)
        return heap

    def build_tree(self, heap):
        while len(heap) > 1:
            node1 = heapq.heappop(heap)
            node2 = heapq.heappop(heap)
            merged = HuffmanNode(None, node1.freq + node2.freq)
            merged.left = node1
            merged.right = node2
            heapq.heappush(heap, merged)
        return heap[0]

    def generate_codes(self, node, current_code=""):
        if not node:
            return
        if node.char is not None:
            self.codes[node.char] = current_code
            self.rev_codes[current_code] = node.char
            return
        self.generate_codes(node.left, current_code + "0")
        self.generate_codes(node.right, current_code + "1")

    def encode(self, text):
        return ''.join(self.codes[char] for char in text)

    def decode_text(self, encoded_text):
        current_code = ""
        decoded_text = ""
        for bit in encoded_text:
            current_code += bit
            if current_code in self.rev_codes:
                decoded_text += self.rev_codes[current_code]
                current_code = ""
        return decoded_text

    def compress(self, text):
        freq_table = self.build_freq_table(text)
        heap = self.build_heap(freq_table)
        root = self.build_tree(heap)
        self.generate_codes(root)
        encoded_text = self.encode(text)
        return encoded_text

    def compress_file(self, input_path, output_path):
        if is_text_file(input_path):
            with open(input_path, 'r', encoding='utf-8') as file:
                text = file.read()
        else:
            with open(input_path, 'rb') as file:
                byte_data = file.read()
                text = ''.join(chr(byte) for byte in byte_data)

        encoded = self.compress(text)
        padded = self.pad_encoded_text(encoded)
        byte_array = self.get_byte_array(padded)

        # Save both code table and compressed bytes
        with open(output_path, 'wb') as output:
            # save code table as JSON 
            import json
            code_table_json = json.dumps(self.codes).encode('utf-8')
            output.write(len(code_table_json).to_bytes(4, 'big'))  # 4 bytes length
            output.write(code_table_json)

            output.write(bytes(byte_array))
        return output_path


    def decompress_file(self, input_path, output_path):
        with open(input_path, 'rb') as file:
            import json

            # Read 4 bytes length of code table JSON
            code_table_len = int.from_bytes(file.read(4), 'big')
            code_table_json = file.read(code_table_len)
            self.codes = json.loads(code_table_json)
            self.rev_codes = {v: k for k, v in self.codes.items()}

            # Read remaining compressed data
            bit_string = ""
            byte = file.read(1)
            while byte:
                byte = ord(byte)
                bits = bin(byte)[2:].rjust(8, '0')
                bit_string += bits
                byte = file.read(1)

        padded_info = bit_string[:8]
        extra_padding = int(padded_info, 2)
        actual_text = bit_string[8:-extra_padding] if extra_padding > 0 else bit_string[8:]
        decoded_text = self.decode_text(actual_text)

        if is_text_file(output_path):
            with open(output_path, 'w', encoding='utf-8') as out:
                out.write(decoded_text)
        else:
            byte_output = bytearray(ord(ch) for ch in decoded_text)
            with open(output_path, 'wb') as out:
                out.write(byte_output)

        return output_path



    def pad_encoded_text(self, encoded_text):
        extra_padding = 8 - len(encoded_text) % 8
        encoded_text += '0' * extra_padding
        padded_info = "{0:08b}".format(extra_padding)
        return padded_info + encoded_text

    def get_byte_array(self, padded_encoded_text):
        return bytearray(int(padded_encoded_text[i:i+8], 2)
                         for i in range(0, len(padded_encoded_text), 8))

def is_text_file(file_path):
    return file_path.lower().endswith('.txt')
