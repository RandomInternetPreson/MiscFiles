Looks like this is being resolved: https://huggingface.co/DiscoResearch/mixtral-7b-8expert/discussions/3

The reason for this repo is that I was having much success with the Mixtral model from DiscoResearch (https://huggingface.co/DiscoResearch/mixtral-7b-8expert) when it first came out but experienced what seemed to be degraded performance the next day.  The reason was that the configuration_moe_mistral.py and modeling_moe_mistral.py files had been overwritten to reflect newer versions on the huggingface page.  The mixtral model overwrites and uses the new blobs, refs, and snapshots in the windows .cache directory.  To have the model use the .py files directly you need to save them to your machine and edit the code as described below.

To force the mixtral model to use the configuration_moe_mistral.py and modeling_moe_mistral.py files you need to keep them in the DiscoResearch\Mixtral-7b-8expert\ folder directory structure, put the whole directory somewhere on your machine.  Then edit the dynamic_module_utils.py file so it points to your directory location, for textgen webuit it is in installer_files > env > Lib > site-packages > transformers > dynamic_module_utils.py 
 
 ![dynamicmoduleedit](https://github.com/RandomInternetPreson/MiscFiles/assets/6488699/03358925-48bf-4877-aa3f-3394dd69a925)
