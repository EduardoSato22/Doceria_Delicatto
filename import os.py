import os
from PIL import Image

# Configurações de caminhos
pasta_origem = './images'
pasta_thumb = './images/thumb'

if not os.path.exists(pasta_thumb):
    os.makedirs(pasta_thumb)

tamanho_thumb = (400, 400)

def converter_inteligente():
    arquivos = [f for f in os.listdir(pasta_origem) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    
    if not arquivos:
        print("Nenhuma imagem JPG/PNG encontrada.")
        return

    print(f"🔍 Encontradas {len(arquivos)} imagens originais. Verificando...")

    processadas = 0
    puladas = 0

    for arquivo in arquivos:
        caminho_original = os.path.join(pasta_origem, arquivo)
        nome_puro = os.path.splitext(arquivo)[0]
        nome_saida = f"{nome_puro}.webp"
        
        caminho_saida_grande = os.path.join(pasta_origem, nome_saida)
        caminho_saida_thumb = os.path.join(pasta_thumb, nome_saida)

        # 🚀 A MÁGICA AQUI: Verifica se os dois arquivos WebP já existem
        if os.path.exists(caminho_saida_grande) and os.path.exists(caminho_saida_thumb):
            print(f"⏭️ Pulando: {arquivo} (já foi convertido para WebP)")
            puladas += 1
            continue # Pula para o próximo arquivo no 'for'

        try:
            with Image.open(caminho_original) as img:
                if img.mode == "P":
                    img = img.convert("RGBA")
                elif img.mode not in ("RGB", "RGBA"):
                    img = img.convert("RGB")

                # 1. Salva a Grande (Lossless)
                img.save(caminho_saida_grande, "WEBP", lossless=True, quality=100, method=6)
                
                # 2. Salva a Thumb (Lanczos)
                img_thumb = img.copy()
                img_thumb.thumbnail(tamanho_thumb, Image.Resampling.LANCZOS)
                img_thumb.save(caminho_saida_thumb, "WEBP", quality=95, method=6)
                
                print(f"✅ Convertido com Sucesso: {arquivo} -> {nome_saida}")
                processadas += 1
                
        except Exception as e:
            print(f"❌ Erro em {arquivo}: {e}")

    print("\n🎉 Resumo da Operação:")
    print(f" - Novas convertidas: {processadas}")
    print(f" - Já existiam (puladas): {puladas}")

if __name__ == "__main__":
    converter_inteligente()