<template>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
            <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="是否管理员" prop="isroot">
            <el-switch v-model="form.isroot" :active-value=1 :inactive-value=0 inline-prompt active-text="是"
                inactive-text="否" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="saveEdit(formRef)">保 存</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { type FormInstance, type FormRules } from 'element-plus';
import { ref } from 'vue';


const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    edit: {
        type: Boolean,
        required: false
    },
    update: {
        type: Function,
        required: true
    }
});

const defaultData = {
    name: '',
    address: '',
    isroot: false
};


const form = ref({ ...(props.edit ? props.data : defaultData) });

const rules: FormRules = {
    name: [{ required: true, message: '不能为空', trigger: 'change' }],
    address: [{ required: true, message: '不能为空', trigger: 'change' }],
    isroot: [{ required: true, message: '不能为空', trigger: 'change' }]
};
const formRef = ref<FormInstance>();
const saveEdit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(valid => {
        if (!valid) {
            return false;
        } else {
            props.update(form.value);
        }

    });
};

</script>

<style></style>
