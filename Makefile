# Detecta se venv está ativo
VENV_ACTIVATED := $(shell [ -n "$$VIRTUAL_ENV" ] && echo yes || echo no)
PYINSTALLER := $(shell command -v pyinstaller 3> /dev/null)

# Diretórios
SRC_DIR := src-python
BIN_DIR := bin

# Lista de scripts Python
PY_SCRIPTS := $(shell find $(SRC_DIR) -name '*.py')

# Targets separados
TARGET_LINUX := x86_64-unknown-linux-gnu
TARGET_WINDOWS := x86_64-pc-windows-msvc

# Gera nome do binário preservando estrutura
define bin_name_linux
$(BIN_DIR)/$(dir $(subst $(SRC_DIR)/,,$1))$(basename $(notdir $1))-$2
endef

define bin_name_windows
$(BIN_DIR)/$(dir $(subst $(SRC_DIR)/,,$1))$(basename $(notdir $1))-$2$(if $(filter %windows-msvc,$2),.exe,)
endef

# Listas finais
BINARIES_LINUX := $(foreach script,$(PY_SCRIPTS),$(call bin_name_linux,$(script),$(TARGET_LINUX)))
BINARIES_WINDOWS := $(foreach script,$(PY_SCRIPTS),$(call bin_name_windows,$(script),$(TARGET_WINDOWS)))

.PHONY: linux windows clean check_venv

# Alvo para Linux
linux: check_venv $(BINARIES_LINUX)

# Alvo para Windows
windows: check_venv $(BINARIES_WINDOWS)

check_venv:
ifeq ($(VENV_ACTIVATED),no)
	$(error Virtual environment is not activated. Please activate your venv before compiling)
endif
ifeq ($(PYINSTALLER),)
	$(error pyinstaller not found. Please install pyinstaller in your venv)
endif

# Regra para compilar preservando a estrutura
$(BIN_DIR)/%:
	@echo "Compilando $@ ..."
	@mkdir -p $(dir $@)
	@NAME=$(basename $(notdir $@)) ; \
	TARGET="" ; \
	SCRIPT="" ; \
	for t in $(TARGET_LINUX) $(TARGET_WINDOWS); do \
		case $$NAME in \
			*"-"$$t) SCRIPT=$${NAME%"-$$t"} ; TARGET=$$t ; break ;; \
		esac ; \
	done ; \
	if [ -z "$$SCRIPT" ] || [ -z "$$TARGET" ]; then \
		echo "Erro: não conseguiu identificar script e target para $$NAME" ; exit 2 ; \
	fi ; \
	EXT=""; \
	if [ "$(MAKECMDGOALS)" = "windows" ] && echo $$TARGET | grep -q "windows-msvc"; then EXT=".exe"; fi ; \
	SRC_PATH=$(SRC_DIR)/$(subst $(BIN_DIR)/,,$(dir $@))$$SCRIPT.py ; \
	echo "Script: $$SRC_PATH, Target: $$TARGET, Ext: $$EXT" ; \
	pyinstaller --onefile --distpath $(dir $@) $$SRC_PATH > /dev/null ; \
	mv $(dir $@)$$SCRIPT$$EXT $@ ; \
	rm -rf build __pycache__ *.spec

clean:
	rm -rf $(BIN_DIR) build __pycache__ *.spec
