import os
import sys
import traceback

try:
    # 确保使用CPU
    os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
    
    print("正在导入modelscope...")
    from modelscope.pipelines import pipeline
    from modelscope.utils.constant import Tasks
    print("成功导入modelscope")
    
    # 检查命令行参数
    if len(sys.argv) < 2:
        print("用法: python test_asr.py <音频文件路径>")
        sys.exit(1)
    
    audio_path = sys.argv[1]
    
    # 检查文件是否存在
    if not os.path.exists(audio_path):
        print(f"错误: 文件不存在 {audio_path}")
        sys.exit(1)
    
    print(f"文件 {audio_path} 存在，大小: {os.path.getsize(audio_path)} 字节")
    
    # 加载模型
    print("正在加载语音识别模型...")

    asr = pipeline(
        task=Tasks.auto_speech_recognition,
        model='damo/speech_paraformer-large-vad-punc_asr_nat-zh-cn-16k-common-vocab8404-pytorch',
        device='cpu'
    )
    print("模型加载成功")
    
    # 进行识别
    print("开始识别音频...")
    result = asr(audio_path)
    print("识别结果:", result)
    
except Exception as e:
    print(f"发生错误: {e}")
    print("\n详细错误信息:")
    traceback.print_exc()
    sys.exit(1)